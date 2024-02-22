import PostImage from '../../assets/post_image.png'
import editButton from '../../assets/editButton.svg'
import deleteButton from '../../assets/deleteButton.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePost } from '../../contexts/UsePost'
import { useEffect, useState } from 'react'
import { useUser } from '../../contexts/useUser'
import LoadingSpinner from '../LoadingSpinner'
import parse from 'html-react-parser'
import DeletePostDialog from '../DeletePostDialog'
function PostDetail() {

    const navigate = useNavigate();
    const postContext = usePost();
    const user = useUser();
    const { slug } = useParams()
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [dialog, setDialog] = useState(false);

    const deletePost = async () => {
        try {
            setLoading(true);
            await postContext.removeFile(post?.image_id);
            await postContext.remove(post?.$id);
            setPost(null);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {

        const currentPost = postContext.current.find(post => post.slug === slug);

        if (currentPost) {
            setPost(currentPost);
            setLoading(false);
        } else {
            //fetch Data
            (async () => {
                if (!post) {
                    try {
                        const response = await postContext.getPost(slug,user.current.$id);
                        setPost(response.documents[0]);
                        setLoading(false);
                    } catch (err) {
                        navigate('/user/posts');
                    }
                }

            })();
        }

    }, [post]);

    if (loading)
        return <LoadingSpinner />

    return (
        <div className='flex flex-col items-center'>
            <div className='max-w-[680px] flex flex-col gap-6'>

                {/* Post Title */}
                <div className='flex flex-wrap items-center'>

                    <h1 className='text-justify'>
                        {post?.title}
                    </h1>

                    {user.current?.$id === post?.creator &&
                        <>
                            <Link to={`/post/edit/${post?.slug}`}>
                                <img src={editButton} />
                            </Link>

                            <button onClick={()=>setDialog(true)}>
                                <img src={deleteButton} />
                            </button>

                            {dialog &&
                                <DeletePostDialog
                                    closeDialog={() => setDialog(false)}
                                    deletePost = {deletePost}
                                />}
                        </>
                    }

                </div>

                {/* Post Category */}
                <div className='text-date mb-1'>{post?.category} | {post?.$updatedAt?.split('T')[0]}</div>

                {/*Post image */}
                <div className="">
                    <img
                        className='w-full rounded-lg object-cover'
                        src={post?.image_id ? postContext.getFilePreview(post.image_id) : PostImage}
                        alt="Post Image"
                    />
                </div>

                {/* Post Body */}
                <div className='flex text-post flex-col gap-6'>
                    {parse(post?.body ? post?.body : "")}
                </div>

            </div>
        </div>
    )
}

export default PostDetail
