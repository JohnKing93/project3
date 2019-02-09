import React, { Component } from "react";
import { Col, Row, Container } from "../Grid";
import { ColorCard, ColorCardBody, ColorCardFooter } from "../Card";
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
        console.log("Altered Roles");
        console.log(roles);
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
    const roleMember = {
      statusID: 6,
      userID: this.state.user.id,
      roleID: roleId
    }
    console.log(roleMember);
    API.postRoleMember(roleMember)
    .then(res => {
      this.loadRoleMembers();
    })
    .catch(err => console.log(err));
  };

  updateRoleMember = (id, action) => {

  }

  deleteRoleMember = (id) => {
    API.deleteRoleMember(id)
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
              {role.statusID == 4 && <span className="badge badge-success">Open</span>}
              {role.statusID == 5 && <span className="badge badge-danger">Closed</span>}
            </ColorCardBody>
            <ColorCardFooter>
              {role.userStatus == "Applied" && <span className="badge badge-primary">Applied</span>}
              {role.userStatus == "Approved" && <span className="badge badge-success">Approved</span>}
              {role.userStatus == "Declined" && <span className="badge badge-danger">Declined</span>}
              <div className="btn-group btn-group-sm" role="group" aria-label="Role Options">
                {(this.state.user.id == this.state.project.ownerId && role.statusID == 4) &&
                  <>
                  <Button
                    className="btn btn-secondary"
                    onClick={() => this.updateRole(role.id, 5)}
                  >
                    Close
                  </Button>
                  <Button
                    className="btn btn-secondary"
                    onClick={() => this.deleteRole(role.id)}
                  >
                    Delete
                  </Button>
                  </>
                }
                {(this.state.user.id == this.state.project.ownerId && role.statusID == 5) &&
                  <Button
                    className="btn btn-secondary"
                    onClick={() => this.updateRole(role.id, 4)}
                  >
                    Open
                  </Button>
                }
                {(this.state.user.id != this.state.project.ownerId && role.usersStatus == "Not Applied") &&
                  <Button
                    className="btn btn-secondary"
                    onClick={() => this.createRoleMember(role.id)}
                  >
                    Apply
                  </Button>
                }
                {(this.state.user.id != this.state.project.ownerId && role.usersStatus == 6) &&
                  <Button
                    className="btn btn-secondary"
                    onClick={() => this.deleteRoleMember(role.usersRoleMemberId)}
                  >
                    Cancel
                  </Button>
                }
              </div>
            </ColorCardFooter>
          </ColorCard>
        ))}
      </div>
    );
  }
}

export default RolesAndMembers;
