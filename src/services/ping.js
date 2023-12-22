import http from "../helpers/httpCommon";

class PingService {
    ping() {
        return http().post("/admin/ping", {});
    }
}

export default new PingService();
