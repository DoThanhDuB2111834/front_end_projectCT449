import createApiClient from "./api.service";

class AuthService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }
  async login(loginData) {
    return await this.api.post("/login", loginData);
  }

  async logout() {
    return await this.api.post("/logout");
  }

  async getRole() {
    return await this.api.get("/getRole");
  }
}

export default new AuthService();
