import axios from "axios";

export default {

  registerUser: function(user) {
    return axios.post("/api/users/register", user);
  },
  loginUser: function(user) {
    return axios.post("/api/users/login", user);
  }

};
