import createApiClient from "./api.service";

class PublisherService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/readers")).data;
  }

  async findById(id) {
    return (await this.api.get(`/readers/${id}`)).data;
  }

  async create(data) {
    return (await this.api.post("/readers", data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/readers/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/readers/${id}`)).data;
  }
}

export default new PublisherService();
