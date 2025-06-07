import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthContext";
import { AuthContextType } from "../type";

const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");

    useDebugValue(context.auth, (auth) =>
        auth?.userId ? "Logged In" : "Logged Out"
    );

    return context;
};

export default useAuth;