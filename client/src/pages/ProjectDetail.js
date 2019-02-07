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
    projectID: '',
    statusID: '',
    projectMembers: [],
    milestones: []
  };

  componentDidMount() {
    this.loadProject();
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
                    <Col size="md-6">
                      <h3>Contributor: {this.state.owner}</h3>
                    </Col>
                    <Col size="md-6">
                      <DropDown>
                        {/* <DropDownBtn
                    data-toggle="modal"
                    data-target="#editModal"
                  >
                  <p>Edit</p>
                  </DropDownBtn> */}
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
                    <Col size="lg-6 md-12">
                      <div className="detail-list-section">
                        <h2>Team Roles</h2>
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
                                  <RoleDropBtn />
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
                              />
                            </FormGroup>
                            <FormBtn
                              className="btn blue-btn card-item-submit"
                            >Submit</FormBtn>
                          </Form>
                        </div>
                        <div className="project-pg-list">
                        {this.state.milestones.length ? (
                          <List >
                            <MilestoneEditModal />
                            {this.state.milestones.map(milestone => (
                              <ListItem key={milestone.id}>
                                <Card >
                                  <h2>
                                    {milestone.milestone}
                                  </h2>
                                  {/* <DetailBtn className="blue-btn"></DetailBtn> */}
                                  <p className="listed-details">
                                    {milestone.statusID}
                                  </p>
                                </Card>
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
