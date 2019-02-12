import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { ColorCard, ColorCardBody, ColorCardFooter, MemberCard, MemberCardListItem, MemberCardListGroup } from "../Card";
import { Button } from "../Form";
import API from "../../utils/API";
import { ProjectDetailMainModal, ProjectRoleEditModal, RoleApplicantModal, MilestoneEditModal } from "../Modal";

class RolesAndMembers extends Component {

  // -Project
  // ---Users
  // ---Owner
  // -----Edit
  // -----Deactivate
  // -----Add Role
  // -----Add Milestone
  // -----View Timesheets
  // Open in modal and use same fields to add

  // -Roles
  // ---Users
  // -----Apply // createRoleMember() --> loadRoleMembers()
  // -----Cancel // deleteRoleMember() --> loadRoleMembers()
  // -----Applied (Status)
  // -----Accepted (Status)
  // -----Declined (Status)
  // ---Owner
  // -----Close // updateRole() --> loadRoles()
  // -----Delete // deleteRole() --> loadRoles()
  // -Project Members
  // ---Users
  // -----Retire // updateRoleMember() --> loadRoleMembers()
  // ---Owner
  // -----Accept // updateRoleMember() --> loadRoleMembers()
  // -----Decline // updateRoleMember() --> loadRoleMembers()
  // -----Retire // updateRoleMember() --> loadRoleMembers()

  state = {
    user: {
      id: 2,
      permission: 1,
    },
    project: {
      id: 1,
      ownerId: 1
    },
    roles: [],
    roleMembers: [],
    loading: true,
  };

  componentDidMount() {
    this.loadRoles();
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

  render() {
    return (
      <div>
        {this.state.roles.map(role => (
          <ColorCard key={role.id}>
            <ColorCardBody roleTitle={role.title} description={role.description}>
<<<<<<< HEAD
              {role.statusID == 4 && <span className="badge badge-success float-right">Open</span>}
              {role.statusID == 5 && <span className="badge badge-danger float-right">Closed</span>}
            </ColorCardBody>
            <ColorCardFooter>
              {role.usersStatus == 6 && <span className="badge badge-primary float-right">Applied</span>}
              {role.usersStatus == 7 && <span className="badge badge-success float-right">Approved</span>}
              {role.usersStatus == 8 && <span className="badge badge-danger float-right">Declined</span>}
=======
              {role.statusID == 4 && <span className="badge badge-success">Open</span>}
              {role.statusID == 5 && <span className="badge badge-danger">Closed</span>}
            </ColorCardBody>
            <ColorCardFooter>
              {role.usersStatus == 6 && <span className="badge badge-primary">Applied</span>}
              {role.usersStatus == 7 && <span className="badge badge-success">Approved</span>}
              {role.usersStatus == 8 && <span className="badge badge-danger">Declined</span>}
>>>>>>> master
              <div className="btn-group btn-group-sm" role="group" aria-label="Role Options">
                {(this.state.user.id == this.state.project.ownerId && role.statusID == 4) &&
                  <>
                    <Button
<<<<<<< HEAD
                      className="btn blue-btn"
=======
                      className="btn btn-secondary"
>>>>>>> master
                      onClick={() => this.updateRole(role.id, 5)}
                    >
                      Close
                    </Button>
                    <Button
<<<<<<< HEAD
                      className="btn blue-btn"
=======
                      className="btn btn-secondary"
>>>>>>> master
                      onClick={() => this.deleteRole(role.id)}
                    >
                      Delete
                    </Button>
                  </>
                }
                {(this.state.user.id == this.state.project.ownerId && role.statusID == 5) &&
                  <Button
<<<<<<< HEAD
                    className="btn blue-btn"
=======
                    className="btn btn-secondary"
>>>>>>> master
                    onClick={() => this.updateRole(role.id, 4)}
                  >
                    Open
                  </Button>
                }
                {(this.state.user.id != this.state.project.ownerId && role.usersStatus == "Not Applied") &&
                  <Button
<<<<<<< HEAD
                    className="btn blue-btn"
=======
                    className="btn btn-secondary"
>>>>>>> master
                    onClick={() => this.createRoleMember(role.id)}
                  >
                    Apply
                  </Button>
                }
                {(this.state.user.id != this.state.project.ownerId && role.usersStatus == 6) &&
                  <Button
<<<<<<< HEAD
                    className="btn blue-btn"
=======
                    className="btn btn-secondary"
>>>>>>> master
                    onClick={() => this.deleteRoleMember(role.usersRoleMemberId)}
                  >
                    Cancel
                  </Button>
                }
              </div>
            </ColorCardFooter>
          </ColorCard>
        ))}
        {this.state.roleMembers.map(roleMember => (
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
<<<<<<< HEAD
                          className="btn blue-btn"
=======
                          className="btn btn-secondary"
>>>>>>> master
                          onClick={() => this.updateRoleMember(roleMember.id, 7)}
                        >
                          Accept
                        </Button>
                        <Button
<<<<<<< HEAD
                          className="btn blue-btn"
=======
                          className="btn btn-secondary"
>>>>>>> master
                          onClick={() => this.updateRoleMember(roleMember.id, 8)}
                        >
                          Decline
                        </Button>
                      </>
                    }
                    {((this.state.user.id == this.state.project.ownerId || this.state.user.id == roleMember.User.id) && roleMember.statusID == 7) &&
                      <Button
<<<<<<< HEAD
                        className="btn blue-btn"
=======
                        className="btn btn-secondary"
>>>>>>> master
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
        ))}
      </div>
    );
  }
}

export default RolesAndMembers;
