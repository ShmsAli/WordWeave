import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/useUser';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import appConfig from '../config/app';

function EmailVerifyPage() {

    const user = useUser();

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    const secret = urlParams.get('secret');
    // const expire = urlParams.get('expire');
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                if (userId && secret) {
                    await user.updateVerification(userId, secret);
                    setLoading(false);
                }
                else
                    navigate('/');
            } catch (err) {
                setError(err);
                setLoading(false);
                console.log(err);
            }
        })();

    }, []);



    return (
        (loading ? <LoadingSpinner />
            :
            (error ?
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-xl font-semibold">Oops!</h1>
                    <p>{error?.message}</p>
                    <p>
                        &copy; {appConfig.appName}
                    </p>
                    <a href='/' className='underline'>Go to Home</a>
                </div>
                :
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-xl font-semibold">Verified!</h1>
                    <p>Your Email is now verified.</p>
                    <p>
                        &copy; {appConfig.appName}
                    </p>
                    <a href='/' className='underline'>Go to Home</a>
                </div>
            )
        )

    );
}

export default EmailVerifyPage
