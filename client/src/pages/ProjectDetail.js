import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, FormGroup, Label, Form, FormBtn } from "../components/Form";
import { RoleDropBtn, DropDown, DropDownBtn, DetailBtn } from "../components/Buttons";
import { List, ListItem } from "../components/List";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";
import { ProjectDetailMainModal, ProjectRoleEditModal, RoleApplicantModal, MilestoneEditModal } from "../components/Modal";

class ProjectDetail extends Component {

  state = {
    title: '',
    description: '',
    owner: '',
    projectID:'',
    statusID:'',
    projectMembers:[],
    milestones: []
  };

  componentDidMount() {
    this.loadProject();
  };

  loadProject = () => {
    API.getThisProject(this.props.location.search)
      .then(res =>
        this.setState({
          title:res.data[0].title,
          owner: res.data[0].User.firstName + ' ' + res.data[0].User.lastName,
          projectID: res.data[0].id,
          status: res.data[0].statusID,
          projectMembers: res.data[0].ProjectMembers || '',
          milestones: res.data[0].ProjectMilestones || ''
        })
      )
      .catch(err => console.log(err));
  };

  makeArchived = (id) => {
    API.updateProject({
      projectID: id,
      statusID: 3
    })
    .then(res => this.props.history.push('/projects'))
    .catch(err => console.log(err));
  };

  makeCompleted = (id) => {
    API.updateProject({
      projectID: id,
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
                <Col size="md-4">
                <h3>Contributor: {this.state.owner}</h3>
                </Col>
                <Col size="md-4">
                <h1>{this.state.title}</h1>
                </Col>
                <Col size="md-4">
                <DropDown>
                  {/* <DropDownBtn
                    data-toggle="modal"
                    data-target="#editModal"
                  >
                  <p>Edit</p>
                  </DropDownBtn> */}
                  <DropDownBtn
                    onClick={() => this.makeCompleted(this.state.id)}
                  >
                  <p>Complete</p>
                  </DropDownBtn>
                  <DropDownBtn
                    onClick={() => this.makeArchived(this.state.id)}
                  >
                  <p>Archive</p>
                  </DropDownBtn>
                </DropDown>
                <ProjectDetailMainModal />
                </Col>
                </Row>
                <p className="text-center">{this.state.description}</p>
                <h2>Team Roles</h2>
                <Form >
                  <FormGroup >
                    <Label htmlFor="Role Title">Add a New Role</Label>
                    <Input
                      type="text"
                      id="role"
                    />
                  </FormGroup>
                  <FormBtn
                  className=".blue-btn">
                  Submit</FormBtn>
                </Form>
                {this.state.projectMembers.length ? (
                  <List >
                  <ProjectRoleEditModal />
                  <RoleApplicantModal />
                    {this.state.projectMembers.map(member => (
                      <ListItem key={member.id}>
                        <Card >
                          <h2>
                            {member.role}
                          </h2>
                          <RoleDropBtn className="blue-btn"></RoleDropBtn>
                          <h3>
                            {member.User.firstName}
                          </h3>
                          <h4>
                            {/* currently user total */}
                            {member.User.hoursEarned}
                          </h4>
                          <h4>
                            {member.statusID}
                          </h4>
                          </Card>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Roles Created</h3>
                )}
                <h2>Milestones</h2>
                <Form >
                  <FormGroup >
                    <Label htmlFor="Milestone Title">Add a New Milestone</Label>
                    <Input
                      type="text"
                      id="milestone"
                    />
                  </FormGroup>
                  <FormBtn
                  className="blue-btn"
                  >Submit</FormBtn>
                </Form>
                {this.state.milestones.length ? (
                  <List >
                    <MilestoneEditModal />
                    {this.state.milestones.map(milestone => (
                      <ListItem key={milestone.id}>
                        <Card >
                          <h2>
                            {milestone.milestone}
                          </h2>
                          <DetailBtn className="blue-btn"></DetailBtn>
                          <p>
                            {milestone.statusID}
                          </p>
                          </Card>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Milestones for this Project</h3>
                )}
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
