import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
// import { EditBtn } from "../components/Buttons";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";

class UserProfile extends Component {
  state = {
    id: 1,
    name: '',
    email: '',
    position: '',
    hoursRemaining: 0,
    projects: []
  };

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    API
      .getUser(this.state.id)
      .then(user => {
        //Destructure user data
        const {
          firstName,
          lastName,
          email,
          position,
          hoursEarned,
          hoursRedeemed,
          Roles
        } = user.data;

        this.setState({
          name: `${firstName} ${lastName}`,
          email,
          position,
          hoursRemaining: hoursEarned - hoursRedeemed,
          projects: Roles
        });
      })
      .catch(err => {
        console.error(`Error retreiving user: ${err}`);
      });
  };

  render() {
    return (
      <div>
        <Navigation />
        <Container fluid>
          <Row>
            <Col size="md-2" />
            <Col size="md-8">
              <div id="dash-card">
                <Card >
                  <Row >
                    <Col size="lg-4 m-12">
                      <div id="profile-info-div">
                        <div className="user-name-box">
                          <img className="profile-logo" src="images/progrologo.png" />
                          <h1>{this.state.name}</h1>
                          <p className="my-position">{this.state.position}</p>
                          {/* <h3>Skills</h3>
                <p>insert skills here</p> */}
                          {/* <h3>Total Hours: {this.state.hoursRemaining}</h3> */}
                        </div>
                      </div>
                    </Col>
                    <Col size="lg-8 md-12">
                      <div id="profile-project-div">
                        <h1>My Projects</h1>
                        <div id="project-box">
                          <List>
                            {this.state.projects.map(project => (
                              <ListItem key={project.Project.id}>
                                <Link to={`/projects/${project.Project.id}`}>
                                  <h2>
                                    {project.Project.title} : {project.ProjectRole.title}
                                  </h2>
                                  <p>
                                    {project.Project.Status.description}
                                    {/* <EditBtn /> */}
                                  </p>
                                </Link>
                              </ListItem>
                            ))}
                          </List>
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

export default UserProfile;
