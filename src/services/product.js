import http from "../helpers/httpCommon";

class ProductService {
    create(data) {
        return http().post("/admin/product/create", data);
    }

    read(data) {
        return http().post("/admin/product/read", data);
    }

    update(data) {
        return http().post(`/admin/product/update`, data);
    }

    delete(data) {
        return http().post(`/admin/product/delete`, data);
    }

    list(data) {
        return http().post("/admin/product/list", data)
    }
}

export default new ProductService();
