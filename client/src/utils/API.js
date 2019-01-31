import axios from "axios";

export default {

  registerUser: function(user) {
    return axios.post("/api/users/register", user);
  },

  loginUser: function(user) {
    return axios.post("/api/users/login", user);
  },

  authenticateUser: function() {
    return axios.post("api/users/authenticate", { withCredentials: true });
  },

  // Get all Live Projects (approved, in progress)
  getProjects: function() {
    return axios.get("/api/projects");
  },

  //Get a single Project by ID
  getThisProject: function(projectID) {
    return axios.get("/api/projects/:" + projectID);
  },

  //Get all Ideas (conditional to exclude approved ideas, see: api route and controller)
  getIdeas: function() {
    return axios.get("/api/ideas");
  },

  //post submitted Idea to db
  submitIdea: function(newIdea) {
    return axios.post("/api/ideas", newIdea);
  },

  //update part of an existing Idea
  updateIdea: function(req, res) {
    return axios.put("/api/ideas/:" + req.params.id)
  }
};
