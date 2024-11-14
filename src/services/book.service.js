import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/books")).data;
  }
}

export default new BookService();
