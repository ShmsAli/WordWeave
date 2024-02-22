import { useForm } from "react-hook-form";
import Button from "../Button";
import PasswordInput from "../PasswordInput";
import { useUser } from "../../contexts/useUser";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";

function UserPasswordForm() {
    const user = useUser();
    const [serverError, setServerError]= useState(null);

    const { handleSubmit, register, setValue, formState:{errors, isSubmitting} } = useForm();

    const submitForm = async(data) => {
        try{
            setServerError(null);
            await user.updatePassword(data.password,data.old_password);
            setValue('password', '');            
            setValue('old_password', '');           
        }catch(err){
            setServerError(err);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <h1>Change Password</h1>
                {/* Server Error Message */}
                {serverError && <ErrorMessage message={serverError.message} />
                }
                <div className="form-div mt-2">
                    <PasswordInput {...register('old_password', { required: 'Old Password is required' })} errorMessage={errors.old_password ? errors.old_password.message : null} label="Old Password" placeholder="Old Password*" />
                    <PasswordInput {...register('password', { required: 'Password is required' })} errorMessage={errors.password ? errors.password.message : null} label="New Password" placeholder="Password*" />
                </div>
                <Button className='form-button' type="submit">
                    {isSubmitting? "Updating...": "Update"}
                </Button>
            </form>
        </>
    )
}

export default UserPasswordForm
