import axios from "axios";

const api = {
  getData: async (reused, with_reddit, land_success) => {
    return axios.get("/api/rockets", {
      params: {
        reused,
        with_reddit,
        land_success
      }
    });
  }
};

export default api
