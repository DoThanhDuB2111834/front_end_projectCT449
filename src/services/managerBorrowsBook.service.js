import createApiClient from "./api.service";
import axios from "axios";

class BorrowBookService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/manageBorrow")).data;
  }

  getBaseUrl() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}/`;
  }

  async create(data) {
    return (await this.api.post("/manageBorrow", data)).data;
  }

  async clientBorrowRequest(data) {
    return await this.api.post("/manageBorrow/clientBorrowRequest", data).data;
  }

  async verify(code) {
    return await this.api.get(`/manageBorrow/verify/${code}`).data;
  }

  async clientBorrowRequestWithAccount(data) {
    return (
      await this.api.post(`/manageBorrow/clientBorrowRequestWithAccount`, data)
    ).data;
  }

  async findById(id) {
    return (await this.api.get(`/manageBorrow/${id}`)).data;
  }

  async findReaderByKeyword(keyword) {
    return (await this.api.get(`/manageBorrow/findKeyword/${keyword}`)).data;
  }

  async findBookByKeyword(keyword) {
    return (await this.api.get(`/books/findKeyword/${keyword}`)).data;
  }

  async update(id, data) {
    console.log(data);
    return (await this.api.put(`/manageBorrow/${id}`, data)).data;
  }

  async delete(id) {
    return await this.api.delete(`/manageBorrow/${id}`);
  }
}

export default new BorrowBookService();
