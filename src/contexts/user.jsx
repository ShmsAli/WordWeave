import { useState, createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { account } from "../lib/appwrite";
import { ID } from "appwrite";
import LoadingSpinner from '../components/LoadingSpinner';

export const UserContext = createContext();

function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    async function login({ email, password }) {
        await account.createEmailSession(email, password);
        const loggedIn = await account.get();
        setUser(loggedIn);
    }

    async function logout() {
        setLoader(true);
        await account.deleteSession("current");
        setUser(null);
        setLoader(false);
    }

    async function register({ email, password, name }) {
        await account.create(ID.unique(), email, password, name);
        await login({ email, password });
        await createVerification();
    }

    async function createVerification() {
        await account.createVerification('https://localhost:5173/verification');
    }

    async function updateVerification(userId, secret) {
        await account.updateVerification(userId, secret); 
    }

    async function getUser() {
        try {
            const loggedIn = await account.get();
            return loggedIn;
        } catch (err) {
            setUser(null);
        }
    }

    async function updateName(name) {
        const updatedUser = await account.updateName(name);
        setUser(updatedUser);

    }

    async function updateEmail(email, password) {
        const updatedUser = await account.updateEmail(email, password);
        setUser(updatedUser);
    }

    async function updatePassword(password, oldPassword) {
        await account.updatePassword(password, oldPassword);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch (err) {
            setUser(null);
        }
    }

    useEffect(() => {
        (async () => {
            await init();
            setLoader(false)
        })();
    }, []);


    if (loader)
        return <LoadingSpinner/>
   
    return <UserContext.Provider
            value={{
                current: user,
                login,
                logout,
                register,
                getUser,
                updateName,
                updateEmail,
                updatePassword,
                createVerification,
                updateVerification
            }}>
            {children}
        </UserContext.Provider>

}

UserProvider.propTypes = {
    children: PropTypes.node
}

export default UserProvider
