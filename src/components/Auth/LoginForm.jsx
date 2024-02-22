import { Link } from "react-router-dom"
import Input from "../Input"
import FormButton from "../FormButton"
import PasswordInput from "../PasswordInput"
import { useForm } from "react-hook-form"
import { useState } from "react"
import ErrorMessage from "../ErrorMessage"
import { useUser } from "../../contexts/useUser"
import appConfig from "../../config/app"

function LoginForm() {

    const user = useUser();

    const {handleSubmit, register, formState:{errors, isSubmitting}} = useForm();
    const [serverError , setServerError ]= useState(null)

    const submitForm = async (data) => {
        try {
            await user.login(data)
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
                <h3>Welcome Back, Login</h3> 

                {/* Server Error Message */}
                {serverError && <ErrorMessage message={serverError.message}/>
                }

                {/* Email */}
                <Input {...register("email", { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} placeholder="Email*" type="email" label="Email" errorMessage={errors.email ? errors.email.message : null} />

                {/* Password */}
                <PasswordInput {...register("password", { required: 'Password is required' })} placeholder="Password*" label="Password" errorMessage={errors.password ? errors.password.message : null} />

                <FormButton>
                    {isSubmitting? 'Login...' : 'Login'}
                </FormButton>

            </form>

            <div className="text-placeholder">
                Dont have an account?
                <Link
                    to='/signin'
                    className="ms-2 text-gray-950 underline">
                    Sign up
                </Link>
            </div>

        </div>
    )
}

export default LoginForm
