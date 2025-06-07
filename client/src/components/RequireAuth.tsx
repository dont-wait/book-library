import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRole }: { allowedRole: string }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth?.roles)

    return auth?.roles === allowedRole ? (
        <Outlet />
    ) : (
        <Navigate to='/' state={{ from: location }} replace />
    );
};

export default RequireAuth;