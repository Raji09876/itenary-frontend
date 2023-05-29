import apiClient from "./services";

export default {
  getCategories() {
    return apiClient.get("categories");
  }
};
