import createApiClient from "./api.service";
import axios from "axios";

class BookService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/books")).data;
  }
  getBaseUrl() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}/`;
  }

  async create(data) {
    var bookForm = new FormData();
    bookForm.append("name", data.name);
    bookForm.append("price", data.price);
    bookForm.append("quantity", data.quantity);
    bookForm.append("publisherId", data.publisherId);

    bookForm.append("publicationYear", data.publicationYear);
    bookForm.append("author", data.author);
    // Kiểm tra tệp ảnh trước khi thêm vào FormData
    if (data.image) {
      bookForm.append("image", data.image);
    } else {
      console.error("Image file is missing.");
    } // Kiểm tra nội dung của FormData
    for (let [key, value] of bookForm.entries()) {
      console.log(`${key}: ${value}`);
    }
    const ApiData = await axios.post(
      `${this.getBaseUrl()}api/books`,
      bookForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return ApiData.data;
  }

  async findById(id) {
    return (await this.api.get(`/books/${id}`)).data;
  }

  async update(id, data) {
    var bookForm = new FormData();
    bookForm.append("name", data.name);
    bookForm.append("price", data.price);
    bookForm.append("quantity", data.quantity);
    bookForm.append("publisherId", data.publisherId);
    bookForm.append("categoryId", data.categoryId);
    bookForm.append("publicationYear", data.publicationYear);
    bookForm.append("author", data.author);
    // Kiểm tra tệp ảnh trước khi thêm vào FormData
    if (data.image) {
      bookForm.append("image", data.image);
    } else {
      console.error("Image file is missing.");
    } // Kiểm tra nội dung của FormData
    for (let [key, value] of bookForm.entries()) {
      console.log(`${key}: ${value}`);
    }
    const ApiData = await axios.put(
      `${this.getBaseUrl()}api/books/${id}`,
      bookForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return ApiData.data;
  }

  async delete(id) {
    return await this.api.delete(`/books/${id}`).data;
  }
}

export default new BookService();
