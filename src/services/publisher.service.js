import createApiClient from "./api.service";

class PublisherService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/publisers")).data;
  }

  async findById(id) {
    return (await this.api.get(`/publisers/${id}`)).data;
  }

  async create(data) {
    return (await this.api.post("/publisers", data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/publisers/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/publisers/${id}`)).data;
  }
}

export default new PublisherService();
