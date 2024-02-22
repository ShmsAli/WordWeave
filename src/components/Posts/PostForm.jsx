import { useForm } from "react-hook-form";
import Button from "../Button"
import Input from "../Input"
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { usePost } from "../../contexts/UsePost";
import { useNavigate, useParams } from "react-router-dom";
import TinyMCE from "../TinyMCE";
import { useUser } from "../../contexts/useUser";
import LoadingSpinner from "../LoadingSpinner";

function PostForm() {

    const user = useUser();
    const postContext = usePost();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [id, setId] = useState(null);
    const [serverError, setServerError] = useState(null)

    const { handleSubmit, control, getValues, register, formState: { errors, isSubmitting } } = useForm({
        defaultValues: async () => {
            try {
                if (slug) {
                    const response = await postContext.getPost(slug,user.current.$id,true);
                    const { title, category, body } = response.documents[0];
                    setId(response.documents[0].$id);
                    setLoader(false);
                    return { title, category, body }
                }
                else {
                    setLoader(false);
                    return {
                        title: '',
                        category: '',
                        body: '',
                    }
                }

            } catch (err) {
                navigate('/');
            }

        },
    });

    const submitForm = async (data) => {
        setServerError(null)
        try {
            if (slug) {

                const post = data.image[0] ? await postContext.getPost(slug) : null;
                const file = data.image[0] ? await postContext.uploadFile(data.image[0]) : null;

                if (file) {
                    postContext.removeFile(post.image_id); //delete previous image in storage
                    data.image_id = file.$id;
                }

                const response = await postContext.update(id, { ...data });
                navigate(`/post/${response.slug}`);
                
            } else {
                const file = await postContext.uploadFile(data.image[0])
                data.image_id = file.$id
                data.creator = user.current.$id;
                const response = await postContext.add({ ...data });
                navigate(`/post/${response.slug}`);
            }

        }
        catch (err) {
            setServerError(err);
            console.log(err);
        }
    }


    if (loader)
        return <LoadingSpinner />
    return (

        <div>
            <h1>{slug ? 'Edit Post' : 'Create Post'}</h1>
            <form onSubmit={handleSubmit(submitForm)}>

                {/* Server Error Message */}
                {serverError && <ErrorMessage message={serverError.message} />
                }
                <div className="form-div">

                    <div className="md:col-span-2">
                        <Input {...register("title", { required: 'Title is required' })} errorMessage={errors.title ? errors.title.message : null} label="Title" placeholder="Title*" />
                    </div>

                    <Input {...register("category", { required: 'Category is required' })} errorMessage={errors.category ? errors.category.message : null} label="Category" placeholder="Category*" />

                    <Input {...register("image", { required: !slug })} accept="image/png, image/jpg, image/jpeg, image/gif" label="Image" type="file" errorMessage={errors.image ? 'Image is required' : null} />

                    <div className="md:col-span-2">

                        {errors.body && <ErrorMessage message="body is required" />}
                        <TinyMCE control={control} name="body" defaultValue={getValues('body')} />

                    </div>

                </div>
                <Button type="submit" className='form-button'>
                    {slug ?
                        isSubmitting ? 'Updating...' : 'Update Post' :
                        isSubmitting ? 'Saving...' : 'Save Post'
                    }
                </Button>
            </form>
        </div>
    )
}


export default PostForm
