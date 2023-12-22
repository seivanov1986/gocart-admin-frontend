import http from "../helpers/httpCommon";

class AuthService {
    login(data) {
        return http().post("/login", data)
    }
}

export default new AuthService();
