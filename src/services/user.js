import http from "../helpers/httpCommon";

class UserService {
    create(data) {
        return http().post("/admin/user/create", data);
    }

    read(data) {
        return http().post("/admin/user/read", data);
    }

    update(data) {
        return http().post(`/admin/user/update`, data);
    }

    delete(data) {
        return http().post(`/admin/user/delete`, data);
    }

    list(data) {
        return http().post("/admin/user/list", data)
    }
}

export default new UserService();
