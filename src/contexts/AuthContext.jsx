import { createContext , useContext  , useEffect } from "react";
import { signin , signup , getCurrentUser , logout } from "../service/auth";
import { useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children })=> {
   const [user , setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching current user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    // sign up 

    const handleSignup = async (email , password , name) => {
        try{
            const user = await signup(email , password , name);
            setUser(user);
        }
        catch(error) {
            console.log(" Sign up ERROR " , error )
        }
    }

    const handleSignin = async (email, password) => {
        try {
            const user = await signin(email, password);
            setUser(user);
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const value = {
        user,
        loading,
        signup: handleSignup,
        signin: handleSignin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
   
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);