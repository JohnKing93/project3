import React, { Component } from "react";
// import { List, ListItem } from "../components/List";
import { List } from "../components/List";
// import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
// import { DetailBtn } from "../components/Buttons";

class LiveProjects extends Component {
  render() {
    return (
      <div>
        <Navigation ></Navigation>
        <Container fluid>
          <Row>
            <Col size="md-2">
            </Col>
            <Col size="md-8">
            <div id="projects-div">
              <Card >
                <List >
                  This is where the projects info will populate
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
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default LiveProjects;