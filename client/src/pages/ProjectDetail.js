import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, FormGroup, Label, Form, FormBtn } from "../components/Form";
import { DropDownBtn } from "../components/Buttons";
// import { RoleDropBtn, DropDownBtn } from "../components/Buttons";
// import { List, ListItem } from "../components/List";
import { List } from "../components/List";
// import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

class ProjectDetail extends Component {
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
                <h3>Contributor: Name</h3>
                </Col>
                <Col size="md-4">
                <h1>Project Title</h1>
                </Col>
                <Col size="md-4">
                <DropDownBtn ></DropDownBtn>
                </Col>
                </Row>
                <p className="text-center">Project Details</p>
                <h2>Team Roles</h2>
                <Form >
                  <FormGroup >
                    <Label htmlFor="Role Title">And New Role Title</Label>
                    <Input
                    type="text"
                    id="role"
                    />
                  </FormGroup>
                  <FormBtn>Submit</FormBtn>
                </Form>
                <List >
                  This is where the projects info will populate
                    Change what you need to
                  {/* {this.state.projects.map(project => (
                    <ListItem key={project._id}>
                      <Link to={"/projects/" + project._id}>
                      <Card >
                        <h2>
                          {project.role}
                        </h2>
                        <RoleDropBtn ></RoleDropBtn>
                        <h3>
                          User's Name if filled else Open Position
                        </h3>
                        <h4>
                        hrs: insert hours spent on this
                        </h4>
                        <h4>
                        insert position status ex: applied/denied/Apply?
                        </h4>
                        </Card>
                      </Link>
                    </ListItem>
                  ))} */}
                </List>
                <h2>Milestones</h2>
                <Form >
                  <FormGroup >
                    <Label htmlFor="Milestone Title">And New Milestone</Label>
                    <Input
                    type="text"
                    id="milestone"
                    />
                  </FormGroup>
                  <FormBtn>Submit</FormBtn>
                </Form>
                <List >
                  This is where the milestones info will populate
                    Change what you need to
                  {/* {this.state.projects.map(project => (
                    <ListItem key={project._id}>
                      <Link to={"/projects/" + project._id}>
                      <Card >
                        <h2>
                          {project.title}
                        </h2>
                        <DetailBtn ></DetailBtn>
                        <p>
                          {project.description}
                        </p>
                        </Card>
                      </Link>
                    </ListItem>
                  ))} */}
                </List>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProjectDetail;
