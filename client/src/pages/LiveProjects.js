import React, { Component } from "react";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { DetailBtn } from "../components/Buttons";
import API from "../utils/API";

class LiveProjects extends Component {

  state = {
    projects: []
  };

  componentDidMount() {
    this.loadProjects();
  };

  loadProjects = () => {
    API.getProjects()
      .then(res =>
        this.setState({
          projects: res.data
        })
      )
      .catch(err => console.log(err));
  };

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
                {this.state.projects.length ? (
                  <List >
                    {this.state.projects.map(project => (
                      <ListItem key={project._id}>
                        <Link to={"/projects/" + project._id}>
                          <Card >
                            <h2>
                              {project.title}
                            </h2>
                            <DetailBtn></DetailBtn>
                            <p>
                              {project.description}
                            </p>
                          </Card>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
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

export default LiveProjects;
