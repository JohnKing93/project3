import axios from "axios";

export default {
  getUser: (id) => axios.get(`/api/users/${id}`),

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
    return axios.get("/api/projects/" + projectID);
  },

  //Creates a new project
  createProject: function(approvedIdea) {
    return axios.post("/api/projects", approvedIdea);
  },

  //Updates an existing project
  updateProject: function(project) {
    return axios.put("/api/projects/" + project.id, project);
  },

  //Get all Ideas (conditional to exclude approved ideas, see: api route and controller)
  getIdeas: function() {
    return axios.get("/api/ideas");
  },

  //Get all Approved ideas
  getApproved: function() {
    return axios.get("/api/ideas/approved");
  },

  //post submitted Idea to db
  submitIdea: function(newIdea) {
    return axios.post("/api/ideas", newIdea);
  },

  //update part of an existing Idea
  updateIdea: function(idea) {
    return axios.put("/api/ideas/" + idea.id, idea);
  },

  deleteIdea: function(idea) {
    return axios.delete("/api/ideas/" + idea.id);
  }
};
