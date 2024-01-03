import http from "../helpers/httpCommon";

class ImageToProductService {
    create(data) {
        return http().post("/admin/image/to_product/create", data);
    }

    delete(data) {
        return http().post(`/admin/image/to_product/delete`, data);
    }

    list(data) {
        return http().post("/admin/image/to_product/list", data)
    }
}

export default new ImageToProductService();
