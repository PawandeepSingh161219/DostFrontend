import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";


// ======================
// CREATE CONTEXT
// ======================

export const AuthContext = createContext();



// ======================
// AUTH PROVIDER
// ======================

export default function AuthProvider({ children }) {

    // ======================
    // STATE
    // ======================

    const [auth, setAuth] = useState(null);

    const [loading, setLoading] = useState(true);



    // ======================
    // INITIALIZE AUTH
    // ======================

    useEffect(() => {

        try {

            const storedAuth =
                localStorage.getItem("auth");

            if (storedAuth) {

                const parsedAuth =
                    JSON.parse(storedAuth);

                setAuth(parsedAuth);
            }

        }

        catch (error) {

            console.error(
                "Failed to parse auth data",
                error
            );

            localStorage.removeItem("auth");
        }

        finally {

            setLoading(false);
        }

    }, []);

// console.log("Auth state initialized:", auth);

    // ======================
    // LOGIN
    // ======================

    function login(authData) {
        console.log("hello callllll")
        // SAVE TO STATE
        setAuth(authData);

        // SAVE TO STORAGE
        localStorage.setItem(
            "auth",
            JSON.stringify(authData)
        );
    }



    // ======================
    // LOGOUT
    // ======================

    function logout() {

        // CLEAR STATE
        setAuth(null);

        // CLEAR STORAGE
        localStorage.removeItem("auth");
    }



    // ======================
    // DERIVED VALUES
    // ======================

    const user = auth?.user || null;

    const token = auth?.token || null;

    const isAuthenticated = !!token;

// console.log("Auth context values:", {
//     auth,
//     user,
//     token,
//     isAuthenticated
// });

    // ======================
    // CONTEXT VALUE
    // ======================

    const value = {

        auth,

        user,

        token,

        isAuthenticated,

        loading,

        login,

        logout,
    };



    // ======================
    // PROVIDE CONTEXT
    // ======================

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>
    );
}



// ======================
// CUSTOM HOOK
// ======================

// export function useAuth() {

//   const context = useContext(AuthContext);

//   if (!context) {

//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );
//   }

//   return context;
// }