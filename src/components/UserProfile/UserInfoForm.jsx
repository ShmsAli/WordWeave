import { useForm } from "react-hook-form"
import Input from "../Input";
import Button from "../Button";
import { useUser } from "../../contexts/useUser";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";

function UserInfoForm() {
    const user = useUser();
    const [serverError, setServerError]= useState(null);
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name:user.current.name
        }
    });

    const submitForm = async(data) => {
        try {
            setServerError(null);
            await user.updateName(data.name);
        } catch (err) {
            setServerError(err);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <h1>Update Name</h1>
                {/* Server Error Message */}
                {serverError && <ErrorMessage message={serverError.message} />
                }
                <div className="form-div mt-2">
                    <Input {...register('name', { required: 'Name is required' })} errorMessage={errors.name ? errors.name.message : null} label="Name" placeholder="Name*" />
                </div>
                <Button className='form-button' type="submit">
                    {isSubmitting? "Updating...": "Update"}
                </Button>
            </form>
        </>
    )
}

export default UserInfoForm
