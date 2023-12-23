import http from "../helpers/httpCommon";

class ImageService {
    create(data) {
        return http().post("/admin/image/create", data);
    }

    read(data) {
        return http().post("/admin/image/read", data);
    }

    update(data) {
        return http().post(`/admin/image/update`, data);
    }

    delete(data) {
        return http().post(`/admin/image/delete`, data);
    }

    list(data) {
        return http().post("/admin/image/list", data)
    }
}

export default new ImageService();
