import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { ColorCard, ColorCardBody, ColorCardFooter } from "../components/Card";
import { Button } from "../components/Form";
import API from "../utils/API";
import { ProjectDetailMainModal, ProjectRoleEditModal, RoleApplicantModal, MilestoneEditModal } from "../components/Modal";

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
      id: 1,
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
    API.getRoles(this.state.project.id)
      .then(res => {
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
    API.getRoleMembers(this.state.project.id)
      .then(res => {
        let roleMembers = res;
        let usersRoles = res.filter(role => role.userID = this.state.user.id);
        let roles = this.state.roles.map(role => {
          for (i = 0; i < usersRoles.length; i++) {
            if (role.userID = this.state.user.id) {
              role.usersStatus = usersRoles[i].statusID;
              role.usersRoleMemberId = usersRoles[i].id;
              return role;
            }
            role.usersStatus = "Not Applied";
            return role;
          }
        })
        this.setState({
          roles,
          roleMembers,
          loading: false
        })
      })
      .catch(err => console.log(err));
  };

  createRoleMember = (roleId) => {
    let roleMember = {
      statusID: 6,
      userID: this.state.user.id,
      roleID: roleId
    }
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
      <Container fluid>
        {/* Create new role button */}
        {this.state.role.map(role => (
          <Col size="md-2">
            <ColorCard key={role.id}>
              <ColorCardBody>
                {role.statusID == 4 && <span className="badge badge-success">Open</span>}
                {role.statusID == 5 && <span className="badge badge-danger">Closed</span>}
              </ColorCardBody>
              <ColorCardFooter>
                {role.userStatus == "Applied" && <span className="badge badge-primary">Applied</span>}
                {role.userStatus == "Approved" && <span className="badge badge-success">Approved</span>}
                {role.userStatus == "Declined" && <span className="badge badge-danger">Declined</span>}
                <div className="btn-group btn-group-sm" role="group" aria-label="Role Options">
                  {this.state.user.id == this.state.project.ownerId ? (
                    // Owner buttons
                    role.statusID == 4 &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.updateRole(role.id, 5)}
                      >
                        Close
                      </Button>,
                    role.statusID == 4 &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.deleteRole(role.id)}
                      >
                        Delete
                      </Button>,
                    role.statusID == 5 &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.updateRole(role.id, 4)}
                      >
                        Open
                      </Button>
                  ):(
                    // User buttons
                    role.userStatus == "Not Applied" &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.createRoleMember(role.usersRoleMemberId, "Applied")}
                      >
                        Apply
                      </Button>,
                    role.userStatus == "Applied" &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.deleteRoleMember(role.usersRoleMemberId)}
                      >
                        Cancel
                      </Button>
                  )}
                </div>
              </ColorCardFooter>
            </ColorCard>
          </Col>
        ))}
      </Container>
    );
  }
}

export default RolesAndMembers;
