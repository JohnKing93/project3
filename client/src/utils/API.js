import axios from "axios";

export default {
  getUser: (id) => axios.get(`/api/users/${id}`),

  updateUser: function(update) {
    return axios.put("/api/users/" + update.id, update);
  },

  registerUser: function(user) {
    return axios.post("/api/users/register", user);
  },

  loginUser: function(user) {
    return axios.post("/api/users/login", user);
  },

  authenticateUser: function() {
    return axios.post("/api/users/authenticate", { withCredentials: true });
  },

  //Projects
  // Get all Projects
  getProjects: function() {
    return axios.get("/api/projects");
  },

  //Get a single Project by ID
  getThisProject: function(projectID) {
    return axios.get(`/api/projects/${projectID}`);
  },

  createProject: function(approvedIdea) {
    return axios.post("/api/projects", approvedIdea);
  },

  updateProject: function(project) {
    return axios.put(`/api/projects/${project.id}`, project);
  },

  //Ideas
  //Get all Ideas (conditional to exclude approved ideas, see: api route and controller)
  getIdeas: function() {
    return axios.get("/api/ideas");
  },

  castVote: (ideaID, userID) => axios.post('/api/ideavotes', { ideaID, userID }),

  //Get all Approved ideas
  getApproved: function() {
    return axios.get("/api/ideas/approved");
  },

  submitIdea: function(newIdea) {
    return axios.post("/api/ideas", newIdea);
  },

  updateIdea: function(idea) {
    return axios.put(`/api/ideas/${idea.id}`, idea);
  },

  deleteIdea: function(idea) {
    return axios.delete(`/api/ideas/${idea.id}`);
  },

  //Project Roles
  getRoles: function(projectId) {
    return axios.get(`/api/projectroles/projects/${projectId}`);
  },

  postRole: function(role) {
    return axios.post("/api/projectroles", role);
  },

  updateRole: function(role) {
    return axios.put(`/api/projectroles/${role.id}`, role);
  },

  deleteRole: function(roleId) {
    return axios.delete(`/api/projectroles/${roleId}`);
  },

  getRoleMembers: function(projectId) {
    return axios.get(`/api/rolemembers/${projectId}`);
  },

  postRoleMember: function(roleMember) {
    return axios.post("/api/rolemembers", roleMember);
  },

  updateRoleMember: function(roleMember) {
    return axios.put(`/api/rolemembers/${roleMember.id}`, roleMember);
  },

  deleteRoleMember: function(roleMemberId) {
    return axios.delete(`/api/rolemembers/${roleMemberId}`);
  },

  //Milestones
  createMilestone: function(newMilestone) {
    return axios.post("/api/projectmilestones", newMilestone);
  },

  updateMilestone: function(milestone) {
    return axios.put("/api/projectmilestones/" + milestone.id, milestone);
  },

  deleteMilestone: function(milestoneId) {
    return axios.delete("/api/projectmilestones/" + milestoneId);
  },

  getProjectMilestones: function(id) {
    return axios.get(`/api/projectmilestones/${id}`);
  },

  submitTimesheet: function(data) {
    return axios.post("/api/timesheets", data);
  },

  getUsersTimesheets: function(id) {
    return axios.get(`/api/timesheets/user/${id}`);
  },

  getIncentives: function() {
    return axios.get("/api/incentives");
  },

  createIncentive: function(newIncentive) {
    return axios.post("/api/incentives", newIncentive);
  },

  updateIncentive: function(incentive) {
    return axios.get("/api/incentives/" + incentive.id, incentive);
  },

  redeemIncentive: function(record) {
    return axios.post("/api/incentiveredeemed", record);
  }
};
