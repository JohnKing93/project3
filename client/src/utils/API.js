import axios from "axios";

export default {

  registerUser: function(user) {
    return axios.post("/api/register", user);
  }

};
