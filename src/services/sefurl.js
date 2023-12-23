import http from "../helpers/httpCommon";

class SefurlService {
    create(data) {
        return http().post("/admin/sefurl/create", data);
    }

    read(data) {
        return http().post("/admin/sefurl/read", data);
    }

    update(data) {
        return http().post(`/admin/sefurl/update`, data);
    }

    delete(data) {
        return http().post(`/admin/sefurl/delete`, data);
    }

    list(data) {
        return http().post("/admin/sefurl/list", data)
    }
}

export default new SefurlService();
