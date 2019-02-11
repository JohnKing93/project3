import React, { Component } from "react";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { DropDownBtn, DropDown } from "../components/Buttons";
import API from "../utils/API";

class LiveProjects extends Component {
  state = {
    user: this.props.user,
    projects: [],
    projectStatus: 'In Progress'
  };

  componentDidMount() {
    this.loadProjects();
  };

  loadProjects = () => {
    API
      .getProjects()
      .then(res => {
        let projectData = res.data.filter(project => project.Status.description === this.state.projectStatus);
        this.setState({ projects: projectData });
      })
      .catch(err => console.log(err));
  };

  defineStatus = (newStatus) => {
    this.setState({ projectStatus: newStatus });
    this.loadProjects();
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
                <div className="top-right-drop">
                            <DropDown>
                              <DropDownBtn
                                onClick={() => this.defineStatus('In Progress')}
                              >
                                <p>In Progress</p>
                              </DropDownBtn>
                              <DropDownBtn
                                onClick={() => this.defineStatus('Completed')}
                              >
                                <p>Completed</p>
                              </DropDownBtn>
                              <DropDownBtn
                                onClick={() => this.defineStatus('Archived')}
                              >
                                <p>Archived</p>
                              </DropDownBtn>
                            </DropDown>
                            </div>
                  {this.state.projects.length ? (
                    <List >
                      {this.state.projects.map(project => (
                        <ListItem key={project.id}>
                          <Link to={"/projects/" + project.id}>
                            <h2>
                              {project.title}
                            </h2>
                            <p>
                              {project.description}
                            </p>
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
