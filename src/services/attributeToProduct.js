import http from "../helpers/httpCommon";

class AttributeToProductService {
    create(data) {
        return http().post("/admin/attribute/to_product/create", data);
    }

    delete(data) {
        return http().post(`/admin/attribute/to_product/delete`, data);
    }

    list(data) {
        return http().post("/admin/attribute/to_product/list", data)
    }
}

export default new AttributeToProductService();
