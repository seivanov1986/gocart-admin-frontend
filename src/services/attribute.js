import http from "../helpers/httpCommon";

class AttributeService {
    create(data) {
        return http().post("/admin/attribute/create", data);
    }

    read(data) {
        return http().post("/admin/attribute/read", data);
    }

    update(data) {
        return http().post(`/admin/attribute/update`, data);
    }

    delete(data) {
        return http().post(`/admin/attribute/delete`, data);
    }

    list(data) {
        return http().post("/admin/attribute/list", data)
    }
}

export default new AttributeService();
