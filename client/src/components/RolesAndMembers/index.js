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
    open: false,
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
          loadRoleMembers();
        }
      })
      .catch(err => console.log(err));
  };

  loadRoleMembers = () => {
    API.getRoleMembers(this.state.project.id)
      .then(res => {
        let roleMembers = this.state.roles;
        let usersRoles = roleMembers.filter(role => role.userID = this.state.user.id);
        let roles = data.map(role => {
          for (i = 0; i < usersRoles.length; i++) {
            if (role.userID = this.state.user.id) {
              role.usersStatus = userRoles[i].statusID;
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

  createRoleMember = (event) => {
    let roleMember = {
      statusID: 6,
      userID: this.state.user.id,
      roleID: event
    }
    API.postRoleMember(roleMember)
    .then(res => {
      loadRoleMembers();
    })
    .catch(err => console.log(err));
  };

  updateRoleMembers = (roles) => {
    // When a user applies to a role, do we update the state locally or rerender the whole state?
  }

  deleteRoleMember = () => {

  };

  updateRole = (id, action) => {

  };

  deleteRole = () => {

  };

  render() {
    return (
      <Container fluid>
        {/* Create new role button */}
        {this.state.role.map(role => (
          <Col size="md-2">
            <ColorCard key={role.id}>
              <ColorCardBody>
                {role.status.description == "Open" && <span className="badge badge-success">Open</span>}
                {role.status.description == "Closed" && <span className="badge badge-danger">Closed</span>}
              </ColorCardBody>
              <ColorCardFooter>
                {/*
                if not member, show apply
                if member but applied, show cancel application
                if member but approved, show approved
                */}
                <div className="btn-group btn-group-sm" role="group" aria-label="Role Options">
                  {this.state.user.id == this.state.project.ownerId ? (
                    // Owner buttons
                    role.status.description == "Open" &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.updateRole(role.id, "Close")}
                      >
                        Close
                      </Button>,
                    role.status.description == "Open" &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.updateRole(role.id, "Delete")}
                      >
                        Delete
                      </Button>,
                    role.status.description == "Closed" &&
                      <Button
                        className="btn btn-secondary"
                        onClick={() => this.updateRole(role.id, "Open")}
                      >
                        Open
                      </Button>
                  ):(
                    // User buttons
                    role.status.description == "Open" && <span className="badge badge-success">Open</span>,
                    role.status.description == "Closed" && <span className="badge badge-danger">Closed</span>
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
