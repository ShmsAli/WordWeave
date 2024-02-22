import { Link } from "react-router-dom"
import { useUser } from "../../contexts/useUser"
import { usePost } from "../../contexts/UsePost"
import { useEffect, useState } from "react";
// import editButton from '../../assets/editButton.svg'
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
// import Button from "../Button";
import DeletePostDialog from "../DeletePostDialog";
import Pagination from "../Pagination";
import Select from "../Select";
import Input from "../Input";

function UserPostsTable() {

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);

    const { current: { $id } } = useUser();
    const postContext = usePost();

    const [loader, setLoader] = useState(true);
    const [serverError, setServerError] = useState(null);
    const [posts, setPosts] = useState(null);
    const [search, setSearch] = useState(null);
    const [searchLoader, setSearchLoader] = useState(false);

    const [dialog, setDialog] = useState(false); //DeletePostModel


    const handleMove = (moveCount) => {

        setSkip((prev) => prev + moveCount);
    }

    const closeDialog = () => {
        setDialog(false);
    };

    const deletePost = async (post) => {

        try {
            setLoader(true);
            await postContext.removeFile(post?.image_id);
            await postContext.remove(post?.$id);
            setDialog(false);
            setLoader(false);
        } catch (err) {
            setDialog(false);
            setServerError(err.message);
        }
    }

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            if (search !== null) {

                if (skip !== 0)
                    setSkip(0);
                else {
                    (async () => {
                        try {
                            setSearchLoader(true);
                            const response = await postContext.getCurrentUserAllPosts($id, limit, skip, search);
                            setPosts(response);
                            setLoader(false);
                            setSearchLoader(false);
                        } catch (err) {
                            setLoader(false);
                            setServerError(err.message);
                        }

                    })();
                }
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);

    }, [search]);

    useEffect(() => {

        (async () => {
            try {
                setSearchLoader(true);
                const response = await postContext.getCurrentUserAllPosts($id, limit, skip, search);
                setPosts(response);
                setLoader(false);
                setSearchLoader(false);
            } catch (err) {
                setLoader(false);
                setServerError(err.message);
            }

        })();


    }, [postContext, skip, limit]);

    if (loader)
        return <LoadingSpinner />

    if (serverError)
        return <ErrorMessage message={serverError} />


    return (
        <>
            <h3>Your Posts</h3>
            <div className="w-full">
                <Input value={search ? search : ''} onChange={(e) => setSearch(e.target.value)} placeholder="search..." />
            </div>
            <div className="flex gap-2 items-center text-sm">
                Per Page
                <Select defaultValue={`${limit}`} onChange={(e) => { setSkip(0); setLimit(parseInt(e.target.value)); }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </Select>
                {searchLoader && <div className="text-sm text-center">loading...</div>}
            </div>

            <div className="border border-gray-200 rounded-lg relative my-3 overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 min-w-[250px]">
                                Title
                            </th>
                            <th scope="col" className="hidden md:table-cell px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="hidden md:table-cell px-6 py-3">
                                Verify
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>


                    <tbody>
                        {posts.documents && posts.documents.map(post => {

                            return (
                                <tr key={post.$id} className="bg-white border-b">
                                    <th scope="row" className="min-w-[250px] px-6 py-4 font-medium text-gray-900 text-wrap whitespace-nowrap ">
                                        {post.title}
                                    </th>
                                    <td className="hidden md:table-cell px-6 py-4">
                                        {post.category}
                                    </td>
                                    <td className="hidden md:table-cell px-6 py-4">
                                        {post.approved ?
                                            <span className="badge-success">Verified</span>
                                            :
                                            <span className="badge-danger">Unverified</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <Link to={`/post/${post.slug}`} className="text-gray-800">View</Link>

                                        <Link to={`/post/edit/${post.slug}`} className="text-blue-800 font-medium">Edit</Link>

                                        <Link
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setDialog(true);
                                            }}
                                            className="text-red-600">

                                            Delete
                                        </Link>

                                        {dialog && <DeletePostDialog closeDialog={closeDialog} deletePost={() => deletePost(post)} />}

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>

                {posts.total !== 0 &&
                    <Pagination
                        total={posts.total}
                        start={skip + 1}
                        end={Math.min(limit + skip, posts.total)}
                        prev={() => handleMove(-limit)}
                        next={() => handleMove(limit)}
                    />
                }

            </div>
        </>

    )
}

export default UserPostsTable