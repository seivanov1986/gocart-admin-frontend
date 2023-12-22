import { Navigate, Outlet } from "react-router-dom";
import {getToken} from '../authorization/auth'

const IsAuth = () => {
    let token = getToken()
    if (!token) return (<Outlet />)
    return <Navigate to="/admin/" replace />;
}

export default IsAuth;
