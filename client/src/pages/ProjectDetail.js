import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card, ColorCard, ColorCardBody, ColorCardFooter, MemberCard, MemberCardListItem, MemberCardListGroup } from "../components/Card";
import { Input, FormGroup, Label, Form, FormBtn, Button } from "../components/Form";
import { RoleDropBtn, DropDown, DropDownBtn } from "../components/Buttons";
import { List, ListItem } from "../components/List";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";
import { ProjectDetailMainModal, ProjectRoleEditModal, RoleApplicantModal, MilestoneEditModal } from "../components/Modal";
import RolesAndMembers from "../components/RolesAndMembers";

class ProjectDetail extends Component {

  state = {
    user: {
      id: 2,
      permission: 1,
    },
    project: {
      id: 1,
      ownerId: 1
    },
    title: '',
    description: '',
    owner: '',
    projectID: '',
    statusID: '',
    role: 3,
    newMilestone: '',
    projectMembers: [],
    milestones: [],
    roles: [],
    roleMembers: [],
    loading: true,
  };

  componentDidMount() {
    this.loadProject();
    this.loadRoles();
  };

  loadProject = () => {
    API.getThisProject(this.props.match.params.id)
      .then(res =>
        this.setState({
          title:res.data.title,
          description: res.data.description,
          owner: res.data.User.firstName + ' ' + res.data.User.lastName,
          projectID: res.data.id,
          statusID: res.data.statusID,
          projectMembers: res.data.ProjectMembers || '',
          milestones: res.data.ProjectMilestones || ''
        })
      )
      .catch(err => console.log(err));
  };

  loadMilestones = () => {
    API.getProjectMilestones(this.props.match.params.id)
      .then(res =>
        this.setState({
          milestones: res.data,
          newMilestone: ''
        })
      )
      .catch(err => console.log(err));
  };

  loadRoles = () => {
    console.log(this.state.project.id)
    API.getRoles(this.state.project.id)
      .then(res => {
        console.log("loadRoles");
        console.log(res.data);
        this.setState({
          roles: res.data
        })
        if (this.state.loading) {
          this.loadRoleMembers();
        }
      })
      .catch(err => console.log(err));
  };

  loadRoleMembers = () => {
    console.log("loadRoleMembers");
    API.getRoleMembers(this.state.project.id)
      .then(res => {
        console.log("Role Members:")
        console.log(res.data);
        let roleMembers = res.data;
        const usersRoles = roleMembers.filter(role => role.userID == this.state.user.id);
        console.log("User's Roles:");
        console.log(usersRoles);
        console.log("Roles:");
        console.log(this.state.roles);
        const roles = this.state.roles.map(role => {
          if (usersRoles.length == 0 || null || typeof usersRole == undefined) {
            role.usersStatus = "Not Applied";
            return role;
          }
          for (let i = 0; i < usersRoles.length; i++) {
            if (usersRoles[i].roleID == role.id) {
              role.usersStatus = usersRoles[i].statusID;
              role.usersRoleMemberId = usersRoles[i].id;
              return role;
            }
            role.usersStatus = "Not Applied";
            return role;
          }
        })
        console.log("Altered Roles:");
        console.log(roles);
        console.log("Role Members:");
        console.log(usersRoles);
        roleMembers.sort((a, b) => (a.User.id > b.User.id) ? 1 : ((b.User.id > a.User.id) ? -1 : 0));
        this.setState({
          roles,
          roleMembers,
          loading: false
        })
        console.log("Roles");
        console.log(roles);
      })
      .catch(err => console.log(err));
  };

  // Handler for input change that can be used for Role or Milestone
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitMilestone = event => {
    event.preventDefault();
    console.log(this.state.newMilestone);
    if (this.state.newMilestone) {
      API.createMilestone({
        milestone: this.state.newMilestone,
        projectID: this.state.projectID,
        userID: this.state.owner,
        role: this.state.role,
        statusID: 9
      })
      .then(res => this.loadMilestones())
      .catch(err => console.log(err));
    }
  };

  completeMilestone = (id) => {
    API.updateMilestone({
      id,
      statusID: 10
    })
    .then(res => this.loadMilestones())
    .catch(err => console.log(err));
  };

  deleteMilestone = (id) => {
    API.deleteMilestone(id)
    .then(res => this.loadMilestones())
    .catch(err => console.log(err));
  };

  createRoleMember = (roleId) => {
    console.log("createRoleMember");
    const roleMember = {
      roleID: roleId,
      userID: this.state.user.id,
      statusID: 6,
      projectID: this.state.project.id
    }
    console.log(roleMember);
    API.postRoleMember(roleMember)
    .then(res => {
      this.loadRoleMembers();
    })
    .catch(err => {
      console.log("Error:");
      console.log(err);
    });
  };

  updateRoleMember = (roleMemberId, newStatus) => {
    let roleMember = {
      id: roleMemberId,
      statusID: newStatus
    }
    API.updateRoleMember(roleMember)
    .then(res => {
      this.loadRoleMembers();
    })
    .catch(err => console.log(err));
  }

  deleteRoleMember = (roleMemberId) => {
    API.deleteRoleMember(roleMemberId)
    .then(res => {
      this.loadRoleMembers();
    })
    .catch(err => console.log(err));
  };

  updateRole = (roleId, newStatus) => {
    let role = {
      id: roleId,
      statusID: newStatus
    }
    API.updateRole(role)
    .then(res => {
      this.loadRoles();
    })
    .catch(err => console.log(err));
  };

  deleteRole = (roleId) => {
    API.deleteRole(roleId)
    .then(res => {
      this.loadRoles();
    })
    .catch(err => console.log(err));
  };

  makeArchived = (id) => {
    API.updateProject({
      id,
      statusID: 3
    })
    .then(res => this.props.history.push('/projects'))
    .catch(err => console.log(err));
  };

  makeCompleted = (id) => {
    API.updateProject({
      id,
      statusID: 2
    })
    .then(res => this.props.history.push('/projects'))
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Navigation />
        <Container fluid>
          <Row>
            <Col size="md-2">
            </Col>
            <Col size="md-8">
              <div id="project-detail-div">
                <Card >
                  <Row >
                    <Col size="md-6">
                      <h3>Contributor: {this.state.owner}</h3>
                    </Col>
                    <Col size="md-6">
                      <DropDown>
                        <DropDownBtn
                          onClick={() => this.makeCompleted(this.state.projectID)}
                        >
                          <p>Complete</p>
                        </DropDownBtn>
                        <DropDownBtn
                          onClick={() => this.makeArchived(this.state.projectID)}
                        >
                          <p>Archive</p>
                        </DropDownBtn>
                      </DropDown>
                      <ProjectDetailMainModal />
                    </Col>
                  </Row>
                  <Row>
                    <Col size="md-12">
                      <h1>{this.state.title}</h1>
                    </Col>
                  </Row>
                  <p className="text-center detail-text">{this.state.description}</p>
                  <Row>
                    <Col size="md-12">
                      <h2>Members</h2>
                      <div className="member-list-group">
                      {this.state.roleMembers.length ? (
                        this.state.roleMembers.map(roleMember => (
                        // (roleMember.statusID != 11 &&
                          <MemberCard
                            key={roleMember.ProjectRole.id}
                            membersName={`${roleMember.User.firstName} ${roleMember.User.lastName}`}
                            membersPosition={roleMember.User.position}
                          >
                            <MemberCardListGroup>
                              <MemberCardListItem roleName={roleMember.ProjectRole.title}>
                                <div className="btn-group btn-group-sm" role="group" aria-label="Role Member Options">
                                  {(this.state.user.id == this.state.project.ownerId && roleMember.statusID == 6) &&
                                    <>
                                      <Button
                                        className="btn blue-btn"
                                        onClick={() => this.updateRoleMember(roleMember.id, 7)}
                                      >
                                        Accept
                                      </Button>
                                      <Button
                                        className="btn blue-btn"
                                        onClick={() => this.updateRoleMember(roleMember.id, 8)}
                                      >
                                        Decline
                                      </Button>
                                    </>
                                  }
                                  {((this.state.user.id == this.state.project.ownerId || this.state.user.id == roleMember.User.id) && roleMember.statusID == 7) &&
                                    <Button
                                      className="btn blue-btn"
                                      onClick={() => this.updateRoleMember(roleMember.id, 11)}
                                    >
                                      Retire
                                    </Button>
                                  }
                                </div>
                              </MemberCardListItem>
                            </MemberCardListGroup>
                          </MemberCard>
                        // )
                        ))
                      ) : (
                        <h3 className="none-listed">No Current Members</h3>
                      )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col size="lg-6 md-12">
                      <div className="detail-list-section">
                        <h2>Roles</h2>
                        <div className="add-project-card">
                          <Form >
                            <FormGroup >
                              <Label htmlFor="Role Title" className="field-head">Create Role</Label>
                              <Input
                                type="text"
                                id="role"
                              />
                            </FormGroup>
                            <FormBtn
                              className="btn blue-btn card-item-submit">
                              Submit</FormBtn>
                          </Form>
                        </div>
                        <div className="project-pg-list">
                          {this.state.roles.length ? (
                            this.state.roles.map(role => (
                              <ColorCard key={role.id}>
                                <ColorCardBody roleTitle={role.title} description={role.description}>
                                  {role.statusID == 4 && <span className="badge badge-success float-right">Open</span>}
                                  {role.statusID == 5 && <span className="badge badge-danger float-right">Closed</span>}
                                </ColorCardBody>
                                <ColorCardFooter>
                                  {role.usersStatus == 6 && <span className="badge badge-primary float-right">Applied</span>}
                                  {role.usersStatus == 7 && <span className="badge badge-success float-right">Approved</span>}
                                  {role.usersStatus == 8 && <span className="badge badge-danger float-right">Declined</span>}
                                  <div className="btn-group btn-group-sm" role="group" aria-label="Role Options">
                                    {(this.state.user.id == this.state.project.ownerId && role.statusID == 4) &&
                                      <>
                                        <Button
                                          className="btn blue-btn"
                                          onClick={() => this.updateRole(role.id, 5)}
                                        >
                                          Close
                                        </Button>
                                        <Button
                                          className="btn blue-btn"
                                          onClick={() => this.deleteRole(role.id)}
                                        >
                                          Delete
                                        </Button>
                                      </>
                                    }
                                    {(this.state.user.id == this.state.project.ownerId && role.statusID == 5) &&
                                      <Button
                                        className="btn blue-btn"
                                        onClick={() => this.updateRole(role.id, 4)}
                                      >
                                        Open
                                      </Button>
                                    }
                                    {(this.state.user.id != this.state.project.ownerId && role.usersStatus == "Not Applied") &&
                                      <Button
                                        className="btn blue-btn"
                                        onClick={() => this.createRoleMember(role.id)}
                                      >
                                        Apply
                                      </Button>
                                    }
                                    {(this.state.user.id != this.state.project.ownerId && role.usersStatus == 6) &&
                                      <Button
                                        className="btn blue-btn"
                                        onClick={() => this.deleteRoleMember(role.usersRoleMemberId)}
                                      >
                                        Cancel
                                      </Button>
                                    }
                                  </div>
                                </ColorCardFooter>
                              </ColorCard>
                            ))
                          ) : (
                            <h3 className="none-listed">No Roles Created</h3>
                          )}
                          </div>
                      </div>
                    </Col>
                    <Col size="lg-6 md-12">
                      <div className="detail-list-section">
                        <h2>Milestones</h2>
                        <div className="add-project-card">
                          <Form >
                            <FormGroup >
                              <Label htmlFor="Milestone Title" className="field-head">Create Milestone</Label>
                              <Input
                                type="text"
                                id="milestone"
                                name="newMilestone"
                                value= {this.state.newMilestone}
                                onChange={this.handleInputChange}
                              />
                            </FormGroup>
                            <FormBtn
                              className="btn blue-btn card-item-submit"
                              type="submit"
                              onClick={this.submitMilestone}
                            >
                              Submit
                            </FormBtn>
                          </Form>
                        </div>
                        <div className="project-pg-list">
                        {this.state.milestones.length ? (
                          <List >
                            <MilestoneEditModal />
                            {this.state.milestones.map(milestone => (
                              <ListItem key={milestone.id}>
                                <DropDown>
                                  <DropDownBtn
                                    onClick={() => this.completeMilestone(milestone.id)}
                                  >
                                    <p>Complete</p>
                                  </DropDownBtn>
                                  <DropDownBtn
                                    onClick={() => this.deleteMilestone(milestone.id)}
                                  >
                                    <p>Delete</p>
                                  </DropDownBtn>
                                </DropDown>
                                <h2>
                                  {milestone.milestone}
                                </h2>
                                <p className="listed-details">
                                  {milestone.Status.description}
                                </p>
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                            <h3 className="none-listed">No Milestones for this Project</h3>
                          )}
                          </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProjectDetail;
