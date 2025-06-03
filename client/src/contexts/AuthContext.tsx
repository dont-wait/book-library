import { createContext, ReactNode, useState } from "react";
import { AuthData } from "../type";

interface AuthContextType {
    auth: AuthData | null;
    setAuth: (auth: AuthData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthData | null>(null);

    const value = {
        auth,
        setAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;