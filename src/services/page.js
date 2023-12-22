import http from "../helpers/httpCommon";

class PageService {
    create(data) {
        return http().post("/admin/page/create", data);
    }

    read(data) {
        return http().post("/admin/page/read", data);
    }

    update(data) {
        return http().post(`/admin/page/update`, data);
    }

    delete(data) {
        return http().post(`/admin/page/delete`, data);
    }

    list(data) {
        return http().post("/admin/page/list", data)
    }
}

export default new PageService();
