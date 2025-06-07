// UserContext.tsx

import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextType {
    userId: string | null;
    setUserId: (userId: string | null) => void;
}

interface UserProviderProps {
    children: ReactNode
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserId = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
