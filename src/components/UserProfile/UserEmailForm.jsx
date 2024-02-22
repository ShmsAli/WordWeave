import { useForm } from "react-hook-form"
import Input from "../Input";
import Button from "../Button";
import { useUser } from "../../contexts/useUser";
import PasswordInput from "../PasswordInput";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage";

function UserEmailForm() {

    const user = useUser();
    const [serverError, setServerError] = useState(null);

    const { handleSubmit, register, setValue, formState:{errors, isSubmitting} } = useForm({
        defaultValues: {
            email: user.current.email,
        }
    });

    const submitForm = async(data) => {
        try{
            setServerError(null);
            await user.updateEmail(data.email, data.password);
            setValue('password', '');
        }catch(err){
            setServerError(err);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <h1>Update Email</h1>
                {/* Server Error Message */}
                {serverError && <ErrorMessage message={serverError.message} />
                }
                <div className="form-div mt-2">
                    <Input {...register('email', { required: 'Email is required' })} errorMessage={errors.email ? errors.email.message : null} type="email" label="Email" placeholder="Email*" />
                    <PasswordInput {...register('password', { required: 'Password is required' })} errorMessage={errors.password ? errors.password.message : null} label="Password" placeholder="Password*" />
                </div>
                <Button className='form-button' type="submit">
                    {isSubmitting? "Updating...": "Update"}
                </Button>
            </form>
        </>
    )
}

export default UserEmailForm
