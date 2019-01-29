import axios from "axios";

export default {

  registerUser: function(user) {
    return axios.post("/api/users/register", user);
  },
  loginUser: function(user) {
    return axios.post("/api/users/login", user);
  },

  //Get all Live Projects (approved, in progress)
  getProjects: function() {
    return axios.get("/api/projects");
  },

  //Get all Ideas (submitted, not yet approved)
  getIdeas: function() {
    return axios.get("/api/ideas");
  },

  //post submitted Idea to db
  submitIdea: function(newIdea) {
    return axios.post("/api/ideas", newIdea);
  }
};
