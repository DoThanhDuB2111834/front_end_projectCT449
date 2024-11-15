import createApiClient from "./api.service";

class CategoryService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/categories")).data;
  }

  async findById(id) {
    return (await this.api.get(`/categories/${id}`)).data;
  }

  async create(data) {
    return (await this.api.post("/categories", data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/categories/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/categories/${id}`)).data;
  }
}

export default new CategoryService();
