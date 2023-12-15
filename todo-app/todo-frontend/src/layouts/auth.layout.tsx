import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/providers/auth.provider";

export const AuthLayout = () => {
    const { status, user } = useAuth();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'guest' || !user) {
        return (
            <Navigate to="/login" />
        )
    }

    return (
        <Outlet />
    );
};

export const LoadingAuth = () => {
    return (
        <div className="fixed top-0 left-0 bg-white flex justify-center items-center">
            <div className="relative inline-flex">
                <div className="w-8 h-8 bg-stone-700 rounded-full"></div>
                <div className="w-8 h-8 bg-stone-700 rounded-full absolute top-0 left-0 animate-ping"></div>
                <div className="w-8 h-8 bg-stone-700 rounded-full absolute top-0 left-0 animate-pulse"></div>
            </div>
        </div>
    )
}