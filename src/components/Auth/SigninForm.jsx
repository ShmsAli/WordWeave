import { Link } from "react-router-dom";
import Input from "../Input";
import FormButton from "../FormButton";
import PasswordInput from "../PasswordInput";
import { useForm } from "react-hook-form";
import { useUser } from "../../contexts/useUser";
import ErrorMessage from "../ErrorMessage";
import { useState } from "react";
import appConfig from "../../config/app";

function SigninForm() {
    const user = useUser();
    const [serverError , setServerError ]= useState(null)
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();

    const submitForm = async (data) => {
        try {
            setServerError(null);
            await user.register(data)
        }
        catch (err) {
            setServerError(err);
        }
    };

    return (
        <div className="max-w-2xl w-full px-8 pt-4 pb-12 border-[#A6A6A6] sm:border rounded-lg shadow-sm divide-y-1">

            <Link to='/'>
                <h2 className="text-center sm:text-left">{appConfig.appName}</h2>
            </Link>

            {/* Divider */}
            <div className="hidden sm:block mx-[-32px] border-b border-[#A6A6A6]"></div>

            <form onSubmit={handleSubmit(submitForm)} className="my-4">
                <h3>Create an account</h3>

                {/* Server Error Message */}
                {serverError && <ErrorMessage message={serverError.message}/>
                }

                {/* Name */}
                <Input {...register("name", { required: 'Name is required' })} errorMessage={errors.name ? errors.name.message : null} placeholder="Name*" label="Name" />

                {/* Email */}
                <Input {...register("email", { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} placeholder="Email*" type="email" label="Email" errorMessage={errors.email ? errors.email.message : null} />

                {/* Password */}
                <PasswordInput {...register("password", { required: 'Password is required' })} placeholder="Password*" label="Password" errorMessage={errors.password ? errors.password.message : null} />

                <FormButton>
                    {isSubmitting?'Signing...' :'Sign in'}
                </FormButton>

            </form>

            <div className="text-placeholder">
                Already have an account?
                <Link to='/login' className="ms-2 text-gray-950 underline">Login</Link>
            </div>

        </div>
    );
}

export default SigninForm;