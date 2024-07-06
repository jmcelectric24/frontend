"use client";
import { useState, useEffect, useContext, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

interface AuthState {
    user: null | string;
    token: string;
}

interface GlobalContextType {
    screenSize: number;
    auth: AuthState;
    setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
    verifyToken: (token: string) => Promise<boolean>;
}

const defaultContextValue: GlobalContextType = {
    screenSize: 0,
    auth: {
        user: null,
        token: ""
    },
    setAuth: () => {}, // Dummy function, will be overwritten by the actual function
    verifyToken: async () => false // Dummy promise, will be overwritten by the actual function
};

const GlobalContext = createContext<GlobalContextType>(defaultContextValue);
type ContextProviderProps = {
    children: React.ReactNode;
};

function GlobalStateProvider({ children }: ContextProviderProps) {

    const router = useRouter();
    const pathname = usePathname();

    const [auth, setAuth] = useState<AuthState>({
        user: null,
        token: "",
    });
    const [authInitialized, setAuthInitialized] = useState<boolean>(false);

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;
    }, [auth.token]);

    const [screenSize, setScreenSize] = useState<number>(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    async function verifyToken(token: string): Promise<boolean> {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/auth/verify-token`,
                {
                    accessToken: token,
                }
            );
            // Check if the response indicates a successful verification
            if (response.data.success) {
                console.log("Token is valid.");
                return true;
            } else {
                // Log and inform the user if the token verification is unsuccessful
                console.log("Token is invalid or expired.");
                toast.error("Please login again");
                return false;
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Handle errors specific to axios, e.g., network issues, bad requests, etc.
                console.error("Axios error verifying token:", error.response?.data.message || error.message);
            } else if (error instanceof Error) {
                // Handle generic errors, such as coding errors in try block (less likely)
                console.error("Error verifying token:", error.message);
            } else {
                // If the caught error is not an instance of Error, log a default message
                console.error("Unexpected error verifying token");
            }
            // Notify user of the error via a toast
            toast.error("An error occurred while verifying the token. Please try again.");
            return false;
        }

    }


    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parsedData = JSON.parse(data);
            setAuth({ user: parsedData.user, token: parsedData.token });
        }
        setAuthInitialized(true);
    }, []);

    useEffect(() => {
        const handleTokenVerification = async () => {
            if (!auth.token) return;
            const verified = await verifyToken(auth.token);
            if (pathname==="/reset-password"){
            }
            else if (!verified) {
                localStorage.removeItem("auth");
                setAuth({ user: null, token: "" });
                router.push("/login");
            } else if (pathname === "/login") {
                router.push("/");
            }
        };
        if (pathname==="/reset-password"){
        }
        else if (authInitialized && auth.user) {
            handleTokenVerification();
        } else if (authInitialized && !auth.user) {
            router.push("/login");
        }
    }, [auth.user, auth.token, authInitialized, pathname]);


    const value = { screenSize, auth, setAuth, verifyToken };

    return (
        <GlobalContext.Provider value={value} >
            {children}
            < ToastContainer />
        </GlobalContext.Provider>
    );
};

const useGlobalState = () => useContext(GlobalContext);

export { useGlobalState, GlobalStateProvider };
