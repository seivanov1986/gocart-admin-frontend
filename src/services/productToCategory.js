import http from "../helpers/httpCommon";

class ProductToCategoryService {
    create(data) {
        return http().post("/admin/product/to_category/create", data);
    }
    
    delete(data) {
        return http().post(`/admin/product/to_category/delete`, data);
    }

    list(data) {
        return http().post("/admin/product/to_category/list", data)
    }
}

export default new ProductToCategoryService();
