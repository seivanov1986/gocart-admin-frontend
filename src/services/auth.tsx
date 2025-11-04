import http from "../helpers/httpCommon";

interface LoginData {
  login: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

class AuthService {
  login(data: LoginData): Promise<{ data: LoginResponse }> {
    return http().post("/login", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default new AuthService();
