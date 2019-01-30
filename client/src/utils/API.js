import axios from "axios";

export default {

  registerUser: function(user) {
    return axios.post("/api/users/register", user);
  },
  loginUser: function(user) {
    return axios.post("/api/users/login", user);
  },
  authenticateUser: function() {
    return axios.post("api/users/authenticate");
  },
  // Get all Live Projects (approved, in progress)
  getProjects: function() {
    return axios.get("/api/projects");
  }

};
