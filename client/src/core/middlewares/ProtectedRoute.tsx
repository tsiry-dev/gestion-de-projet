import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store";
import Loader from "@/shared/components/loader";


export default function ProtectedRoute(){

    const {
        user,
        token,
        isPendingSession,
    } = useSelector(
        (state: RootState)=>state.session
    );


    if(isPendingSession){
        return <Loader />;
    }


    if(!user || !token){
        return <Navigate to="/login" replace />;
    }


    return <Outlet />;
}