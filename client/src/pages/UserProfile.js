import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
// import { VoteUpBtn, VoteDownBtn, DropDownBtn, EditBtn } from "../components/Buttons";
// import { List, ListItem } from "../components/List";
import { List } from "../components/List";
// import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

class UserProfile extends Component {
  render() {
    return (
      <div>
<Navigation ></Navigation>
        <Container fluid>
          <Row>
          <Col size="md-2">
          </Col>
            <Col size="md-8">
              <Card >
                <Row >
                <Col size="md-4">
                <h1>UserName here</h1>
                <h2>Position</h2>
                <p>insert position here</p>
                <h3>Skills</h3>
                <p>insert skills here</p>
                <h3>Total Hours: 0.00</h3>
                </Col>
                <Col size="md-8">
                <h1>My Projects</h1>
                <div>
                <List >
                  This is where the projects info will populate
                  Change what you need to
                  {/* {this.state.projects.map(project => (
                    <ListItem key={project._id}>
                      <Link to={"/projects/" + project._id}>
                        <h2>
                          {project.title} : {project.role}
                        </h2>
                        <p>
                          {project.status} hrs: {project.time}
                          <EditBtn ></EditBtn>
                        </p>
                      </Link>
                    </ListItem>
                  ))} */}
                </List>
                </div>
                </Col>
                </Row>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default UserProfile;
