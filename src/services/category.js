import http from "../helpers/httpCommon";

class CategoryService {
    create(data) {
        return http().post("/admin/category/create", data);
    }

    read(data) {
        return http().post("/admin/category/read", data);
    }

    update(data) {
        return http().post(`/admin/category/update`, data);
    }

    delete(data) {
        return http().post(`/admin/category/delete`, data);
    }

    list(data) {
        return http().post("/admin/category/list", data)
    }

    selectList(data) {
        return http().post("/admin/category/select_list", data)
    }
}

export default new CategoryService();
