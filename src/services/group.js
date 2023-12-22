import http from "../helpers/httpCommon";

class GroupService {
    create(data) {
        return http().post("/admin/group/create", data);
    }

    read(data) {
        return http().post("/admin/group/read", data);
    }

    update(data) {
        return http().post(`/admin/group/update`, data);
    }

    delete(data) {
        return http().post(`/admin/group/delete`, data);
    }

    list(data) {
        return http().post("/admin/group/list", data)
    }
}

export default new GroupService();
