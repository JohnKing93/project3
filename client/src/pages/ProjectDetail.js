import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, FormGroup, Label, Form, FormBtn } from "../components/Form";
import { RoleDropBtn, DropDownBtn, DetailBtn } from "../components/Buttons";
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

  // interpretState() {
  //   switch( {
  //     case '1':
  //       return 'In Progress';
  //   2: 'Completed',
  //   3: 'Applied',
  //   4: 'Approved',
  //   5: 'Declined',
  //   6: 'Milestone Completed'
  // };

  componentDidMount() {
    this.loadProject();
  };

  loadProject = () => {
    API.getThisProject()
      .then(res =>
        this.setState({
          title:res.data.title,
          owner: res.data.User.firstName + ' ' + res.data.User.lastName,
          projectID: res.data.id,
          status: res.data.statusID,
          projectMembers: res.data.ProjectMembers,
          milestones: res.data.ProjectMilestones
        })
      )
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
              <Card >
                <Row >
                <Col size="md-4">
                <h3>Contributor: {this.owner}</h3>
                </Col>
                <Col size="md-4">
                <h1>{this.title}</h1>
                </Col>
                <Col size="md-4">
                <DropDownBtn />
                <ProjectDetailMainModal />
                </Col>
                </Row>
                <p className="text-center">{this.description}</p>
                <h2>Team Roles</h2>
                <Form >
                  <FormGroup >
                    <Label htmlFor="Role Title">Add a New Role</Label>
                    <Input
                      type="text"
                      id="role"
                    />
                  </FormGroup>
                  <FormBtn>Submit</FormBtn>
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
                          <RoleDropBtn ></RoleDropBtn>
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
                  <FormBtn>Submit</FormBtn>
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
                          <DetailBtn ></DetailBtn>
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProjectDetail;
