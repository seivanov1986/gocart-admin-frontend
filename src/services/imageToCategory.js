import http from "../helpers/httpCommon";

class ImageToCategoryService {
    create(data) {
        return http().post("/admin/image/to_category/create", data);
    }

    delete(data) {
        return http().post(`/admin/image/to_category/delete`, data);
    }

    list(data) {
        return http().post("/admin/image/to_category/list", data)
    }
}

export default new ImageToCategoryService();
