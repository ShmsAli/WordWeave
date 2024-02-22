import { Link } from "react-router-dom"
import { useUser } from "../contexts/useUser"
import { useEffect, useState } from "react";

function WarningAlert() {
    const user = useUser();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    const handleClick = async () => {
        try {
            await user.createVerification();
            setMessage('We have sent you an email to verify your email address. Please click on the link in the email to verify your email address.');
        } catch (err) {
            setMessage(err.message);
        }
    }

    useEffect(() => {

        if (!user.current.emailVerification) {
            setShow(true);
        }

    }, [user]);

    return (
        !show ? <></>
            :
            <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 ">
                <span className="font-medium">Verify Your Email! </span>
                {
                    message ==='' ?
                        <>
                            To create a post your email must be verified.
                            <Link onClick={handleClick} className="underline ml-2">Click Here to Verify</Link>
                        </>
                        :
                        <>
                        { message }
                        </>

                }

            </div>

    )
}

export default WarningAlert
