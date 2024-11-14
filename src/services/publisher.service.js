import createApiClient from "./api.service";

class PublisherService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/publisers")).data;
  }
}

export default new PublisherService();
