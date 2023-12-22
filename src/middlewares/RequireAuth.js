import { Navigate, Outlet } from "react-router-dom";
import {getToken} from '../authorization/auth'

const RequireAuth = () => {
    let token = getToken()
    if (!token) return (<Navigate to="/admin/login/" replace />)
    return <Outlet />;
}

export default RequireAuth;
