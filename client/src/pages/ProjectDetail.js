import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card, ColorCard, ColorCardBody, ColorCardFooter, MemberCard, MemberCardListItem, MemberCardListGroup } from "../components/Card";
import { Input, FormGroup, Label, Form, FormBtn, Button } from "../components/Form";
import { DropDown, DropDownBtn } from "../components/Buttons";
import { List, ListItem } from "../components/List";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";
import { ProjectDetailMainModal, MilestoneEditModal } from "../components/Modal";

class ProjectDetail extends Component {

  state = {
    pageTitle: 'ProGro Project',
    user: this.props.user,
    project: {
      id: '',
      owner: '',
      ownerID: '',
      statusID: '',
      title: '',
      description: ''
    },
    newMilestone: '',
    projectMembers: [],
    milestones: [],
    roles: [],
    roleMembers: [],
    roleName: '',
    roleDescription: '',
    loading: true,
  };

  componentDidMount() {
    document.title=this.state.pageTitle;
    this.loadProject();
  };

  loadProject = () => {
    API.getThisProject(this.props.match.params.id)
      .then(res => {
        this.setState({
          project: {
            id: res.data.id,
            owner: res.data.User.firstName + ' ' + res.data.User.lastName,
            ownerID: res.data.User.id,
            statusID: res.data.statusID,
            title: res.data.title,
            description: res.data.description
          },
          projectMembers: res.data.ProjectMembers || '',
          milestones: res.data.ProjectMilestones || ''
        })
      })
      .then(res => this.loadRoles())
      .catch(err => console.log(err));
  };

  loadMilestones = () => {
    API.getProjectMilestones(this.state.project.id)
      .then(res =>
        this.setState({
          milestones: res.data,
          newMilestone: ''
        })
      )
      .catch(err => console.log(err));
  };

  loadRoles = () => {
    API.getRoles(this.state.project.id)
      .then(res => {
        this.setState({
          roles: res.data,
          roleName: '',
          roleDescription: ''
        })
      })
      .then(res => this.state.loading && this.loadRoleMembers())
      .catch(err => console.log(err));
  };

  loadRoleMembers = () => {
    API
      .getRoleMembers(this.state.project.id)
      .then(res => {
        let roleMembers = res.data;
        const usersRoles = roleMembers.filter(role => role.userID === this.state.user.id);
        const roles = this.state.roles.map(role => {
          if (usersRoles.length === 0 || null || typeof usersRole === undefined) {
            role.usersStatus = "Not Applied";
            return role;
          }
          for (let i = 0; i < usersRoles.length; i++) {
            if (usersRoles[i].roleID === role.id) {
              role.usersStatus = usersRoles[i].statusID;
              role.usersRoleMemberId = usersRoles[i].id;
              return role;
            }
            role.usersStatus = "Not Applied";
            return role;
          }
          return null;
        })
        roleMembers.sort((a, b) => (a.User.id > b.User.id) ? 1 : ((b.User.id > a.User.id) ? -1 : 0));
        console.log("Roles:");
        console.log(roles);
        console.log("roleMemmber:")
        console.log(roleMembers);
        this.setState({
          roles,
          roleMembers,
          loading: false
        })
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitMilestone = event => {
    event.preventDefault();
    if (this.state.newMilestone) {
      API.createMilestone({
        milestone: this.state.newMilestone,
        projectID: this.state.project.id,
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
    const roleMember = {
      roleID: roleId,
      userID: this.state.user.id,
      statusID: 6,
      projectID: this.state.project.id
    }
    API.postRoleMember(roleMember)
    .then(res => {
      this.loadRoleMembers();
    })
    .catch(err => {
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

  createRole = event => {
    event.preventDefault();
    if (this.state.roleName) {
      API.postRole({
        title: this.state.roleName,
        description: this.state.roleDescription,
        statusID: 4,
        projectID: this.state.project.id
      })
      .then(res => this.loadRoles())
      .catch(err => console.log(err));
    }
  };

  updateRole = (roleId, newStatus) => {
    let role = {
      id: roleId,
      statusID: newStatus
    }
    API.updateRole(role)
    .then(res => this.loadRoles())
    .catch(err => console.log(err));
  };

  deleteRole = (roleId) => {
    API.deleteRole(roleId)
    .then(res => this.loadRoles())
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
                      <h3>Contributor: {this.state.project.owner}</h3>
                    </Col>
                    <Col size="md-6">
                    {this.state.user.id === this.state.project.ownerID &&
                      <DropDown>
                        <DropDownBtn
                          onClick={() => this.makeCompleted(this.state.project.id)}
                        >
                          <p>Complete</p>
                        </DropDownBtn>
                        <DropDownBtn
                          onClick={() => this.makeArchived(this.state.project.id)}
                        >
                          <p>Archive</p>
                        </DropDownBtn>
                      </DropDown>
                    }
                      <ProjectDetailMainModal />
                    </Col>
                  </Row>
                  <Row>
                    <Col size="md-12">
                      <h1>{this.state.project.title}</h1>
                    </Col>
                  </Row>
                  <p className="text-center detail-text">{this.state.project.description}</p>

                      <h2>Members</h2>
                      <div className="member-list-group">
                      <Row>
                          {this.state.roleMembers.length ? (
                            this.state.roleMembers.map(roleMember => (
                              (roleMember.statusID === 7 || ((this.state.user.id === this.state.project.ownerID) && roleMember.statusID === 6)) && (
                                <MemberCard
                                  key={roleMember.id}
                                  userID={roleMember.User.id}
                                  membersName={`${roleMember.User.firstName} ${roleMember.User.lastName}`}
                                  membersPosition={roleMember.User.position}
                                >
                                  <MemberCardListGroup>
                                    <MemberCardListItem roleName={roleMember.ProjectRole.title}>
                                      <div className="btn-group btn-group-sm" role="group" aria-label="Role Member Options">
                                        {(this.state.user.id === this.state.project.ownerID && roleMember.statusID === 6) &&
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
                                        {((this.state.user.id === this.state.project.ownerID || this.state.user.id === roleMember.User.id) && roleMember.statusID === 7) &&
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
                              )
                            ))
                          ) : (
                            <h3 className="none-listed">No Current Members</h3>
                          )}
                      </Row>
                      </div>
                  <Row>
                    <Col size="lg-6 md-12">
                      <div className="detail-list-section">
                        <h2>Roles</h2>
                        {this.state.user.id === this.state.project.ownerID &&
                          <div className="add-project-card">
                            <Form >
                              <FormGroup >
                                <div className="role-input">
                                <Label htmlFor="Role Title" className="field-head">Create Role</Label>
                                <Input
                                  type="text"
                                  id="role"
                                  name="roleName"
                                  value={this.state.roleName}
                                  placeholder="Title"
                                  onChange={this.handleInputChange}
                                />
                                </div>
                                <div className="role-input">
                                <Input
                                  type="text"
                                  id="role"
                                  name="roleDescription"
                                  value={this.state.roleDescription}
                                  placeholder="Description"
                                  onChange={this.handleInputChange}
                                />
                                </div>
                              </FormGroup>
                              <FormBtn
                                className="btn blue-btn card-item-submit"
                                type="submit"
                                onClick={this.createRole}
                              >
                                Submit
                              </FormBtn>
                            </Form>
                          </div>
                        }
                        <div className="project-pg-list">
                        <div className="role-list-group">
                          {this.state.roles.length ? (
                            this.state.roles.map(role => (
                              <ColorCard key={role.id}>
                                <ColorCardBody roleTitle={role.title} description={role.description}>
                                  {role.statusID === 4 && <span className="badge badge-success float-right">Open</span>}
                                  {role.statusID === 5 && <span className="badge badge-danger float-right">Closed</span>}
                                </ColorCardBody>
                                <ColorCardFooter>
                                  {role.usersStatus === 6 && <span className="badge badge-primary float-right">Applied</span>}
                                  {role.usersStatus === 7 && <span className="badge badge-success float-right">Approved</span>}
                                  {role.usersStatus === 8 && <span className="badge badge-danger float-right">Declined</span>}
                                  <div className="btn-group btn-group-sm" role="group" aria-label="Role Options">
                                    {(this.state.user.id === this.state.project.ownerID && role.statusID === 4) &&
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
                                    {(this.state.user.id === this.state.project.ownerID && role.statusID === 5) &&
                                      <Button
                                        className="btn blue-btn"
                                        onClick={() => this.updateRole(role.id, 4)}
                                      >
                                        Open
                                      </Button>
                                    }
                                    {(this.state.user.id !== this.state.project.ownerID && role.usersStatus === "Not Applied") &&
                                      <Button
                                        className="btn blue-btn"
                                        onClick={() => this.createRoleMember(role.id)}
                                      >
                                        Apply
                                      </Button>
                                    }
                                    {(this.state.user.id !== this.state.project.ownerID && role.usersStatus === 6) &&
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
                      </div>
                    </Col>
                    <Col size="lg-6 md-12">
                      <div className="detail-list-section">
                        <h2>Milestones</h2>
                        {this.state.user.id === this.state.project.ownerID &&
                          <div className="add-project-card">
                            <Form >
                              <FormGroup >
                                <Label htmlFor="Milestone Title" className="field-head">Create Milestone</Label>
                                <Input
                                  type="text"
                                  id="milestone"
                                  name="newMilestone"
                                  value={this.state.newMilestone}
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
                        }
                        <div className="project-pg-list">
                        {this.state.milestones.length ? (
                          <List >
                            <MilestoneEditModal />
                            {this.state.milestones.map(milestone => (
                              <ListItem key={milestone.id}>
                                {this.state.user.id === this.state.project.ownerID &&
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
                                }
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
