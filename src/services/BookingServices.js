import apiClient from "./services";

export default {
  getBookings(id) {
    return apiClient.get("booking/user/"+id);
  },
  addBooking(order) {
    return apiClient.post("/booking/", order);
  },
};
