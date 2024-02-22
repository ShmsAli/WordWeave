import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useUser } from "../../contexts/useUser";
import PropTypes from 'prop-types';
import LoadingSpinner from "../LoadingSpinner";

function AuthLayout({children, authentication=true}) {

    const[loader, setLoader]= useState(true);
    const navigate = useNavigate();
    const {current:authStatus} = useUser();

    useEffect(()=>{
        //if user is not authenticated and we want authentication
        if(!authStatus && authentication){
            navigate('/login');
        }
        // if user is authenticated and we did not want authentication
        else if (authStatus && !authentication){
            navigate('/');
        }

        setLoader(false);

    },[authentication,authStatus,navigate])

    return loader ? <LoadingSpinner/> : <>{children}</>
}

AuthLayout.propTypes = {
    children:PropTypes.node,
    authentication:PropTypes.bool
}

export default AuthLayout
