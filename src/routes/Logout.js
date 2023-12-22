import { Navigate } from "react-router-dom";
import {setToken} from '../authorization/auth'

const Logout = () => {
    setToken("")
    return <Navigate to="/admin/login/" replace />;
};

export default Logout;
