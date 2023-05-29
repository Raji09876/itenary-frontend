import apiClient from "./services";

export default {
  getItineraries() {
    return apiClient.get("itineraries");
  },
  getLatestItineraries() {
    return apiClient.get("itineraries/date/sort-by-date");
  },
  getItinerary(id) {
    return apiClient.get("itineraries/" + id);
  },
  addItinerary(Itinerary) {
    return apiClient.post("itineraries", Itinerary);
  },
  updateItinerary(Itinerary) {
    return apiClient.put("itineraries/" + Itinerary.id, Itinerary);
  },
  deleteItinerary(ItineraryId) {
    return apiClient.delete("itineraries/" + planId);
  },
};
