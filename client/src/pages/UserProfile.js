import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
// import { EditBtn } from "../components/Buttons";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";
import { Input } from "../components/Form";

class UserProfile extends Component {
  state = {
    pageTitle: 'ProGro Profile',
    user: this.props.user,
    id: 0,
    name: '',
    email: '',
    position: '',
    hoursRemaining: 0,
    roles: [],
    projects: [],
    timesheets: [],
    date: '',
    project: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    message: ''
  };

  componentDidMount() {
    document.title = this.state.pageTitle;
    this.getUserData();
  }

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmitTimesheet = event => {
    event.preventDefault();
    if (
      this.state.date === ''
    ) {
      this.setState({
        message: "Please populate all fields"
      });
    }
    else {
      API
      .submitTimesheet({
        ownerID: this.state.user.id,
        projectID: this.state.project,
        start: this.state.date,
        monday: this.state.monday,
        tuesday: this.state.tuesday,
        wednesday: this.state.wednesday,
        thursday: this.state.thursday,
        friday: this.state.friday,
        saturday: this.state.saturday,
        sunday: this.state.sunday,
        statusID: 15
      })
      .then(res => {
        console.log(res.data);
        this.totalHoursEarned();
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  totalHoursEarned = () => {
    console.log("totalHours");
    let totalHours =
      (
        parseFloat(this.state.monday) +
        parseFloat(this.state.tuesday) +
        parseFloat(this.state.wednesday) +
        parseFloat(this.state.thursday) +
        parseFloat(this.state.friday) +
        parseFloat(this.state.saturday) +
        parseFloat(this.state.sunday)
      );
    console.log(totalHours);
    API
    .updateUser({
      id: this.state.user.id,
      hoursEarned: totalHours
    })
    .then(res => {
      console.log("Total Hours:")
      console.log(res.data);
      this.getTimesheets();
    })
    .catch(error => {
      console.log(error);
    });
  }

  getTimesheets = () => {
    console.log("Projects:");
    console.log(this.state.projects);
    API
      .getUsersTimesheets(this.state.user.id)
      .then(res => {
        console.log("Timesheets:")
        console.log(res.data);
        this.setState({ timesheets: res.data })
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUserData = () => {
    //Determine which user profile to render
    const id = this.props.match.params.id || this.state.user.id;

    API
      .getUser(id)
      .then(user => {
        console.log(user.data);
        const {
          id,
          firstName,
          lastName,
          email,
          position,
          hoursEarned,
          hoursRedeemed,
          Roles
        } = user.data;
        this.setState({
          id,
          name: `${firstName} ${lastName}`,
          email,
          position,
          hoursRemaining: hoursEarned - hoursRedeemed,
          roles: Roles
        });
      })
      .then(() => {
        let projectNames = [];
        let projects = [];
        this.state.roles.forEach(role => {
          if (projects.indexOf(role.Project.title === -1)) {
            let data = { id: role.Project.id, title: role.Project.title };
            projectNames.push(role.Project.title);
            projects.push(data);
          }
        })
        this.setState({ projects })
      })
      .then(() => this.getTimesheets())
      .catch(err => {
        console.log(err);
      });
  };

  getProjectTitle = (timesheet) => {
    this.state.projects.map(project => {
      if (project.id === timesheet.projectID) {
        console.log(project.title);
        return project.title
      }
    })
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container fluid>
          <Row>
            <Col size="md-2" />
            <Col size="md-8">
              <div id="dash-card">
                <Card>
                  <Row>
                    <Col size="lg-4 m-12">
                      <div id="profile-info-div">
                        <div className="user-name-box">
                          <img className="profile-logo" src="/images/progrologo.png" alt="account user" />
                          <h1>{this.state.name}</h1>
                          {/* <p className="my-position">{this.state.position}</p> */}
                          {/* <h3>Skills</h3>
                            <p>insert skills here</p> */}
                          {/* <h3>Total Hours: {this.state.hoursRemaining}</h3> */}
                        </div>
                      </div>
                    </Col>
                    <Col size="lg-8 md-12">
                      <div id="profile-project-div">
                        <h1>Projects</h1>
                        <div id="project-box">
                          <List>
                            {this.state.roles.map(role => (
                              role.statusID == 7 && (
                                <ListItem key={role.Project.id}>
                                  <Link to={`/projects/${role.Project.id}`}>
                                    <h2>
                                      {role.Project.title} : {role.ProjectRole.title}
                                    </h2>
                                    <p>
                                      {role.Project.Status.description}
                                      {/* <EditBtn /> */}
                                    </p>
                                  </Link>
                                </ListItem>
                              )
                            ))}
                          </List>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {this.state.user.id == this.state.id &&
                    <>
                      <Row>
                        <Col size="lg-12 md-12">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">M</th>
                                <th scope="col">T</th>
                                <th scope="col">W</th>
                                <th scope="col">Th</th>
                                <th scope="col">F</th>
                                <th scope="col">S</th>
                                <th scope="col">Sn</th>
                                <th scope="col">Project</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.timesheets.map((timesheet, index) => (
                                <tr key={timesheet.id}>
                                  <th scope="row">{index + 1}</th>
                                  <td>{timesheet.start}</td>
                                  <td>{timesheet.monday}</td>
                                  <td>{timesheet.tuesday}</td>
                                  <td>{timesheet.wednesday}</td>
                                  <td>{timesheet.thursday}</td>
                                  <td>{timesheet.friday}</td>
                                  <td>{timesheet.saturday}</td>
                                  <td>{timesheet.sunday}</td>
                                  <td>{timesheet.Project.title}</td>
                                  <td>Approved</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                      <button type="button" className="btn blue-btn" data-toggle="modal" data-target="#exampleModalCenter">
                        Add Timesheet
                      </button>
                    </>
                  }
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
          </Row>
          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Add Timesheet</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.message &&
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  }
                  <form>
                    <div className="form-row">
                      <div className="form-group col">
                        <label htmlFor="monday">M</label>
                        <Input
                          type="number"
                          id="monday"
                          placeholder="0"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="tuesday">T</label>
                        <Input
                          type="number"
                          id="tuesday"
                          placeholder="0"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="wednesday">W</label>
                        <Input
                          type="number"
                          id="wednesday"
                          placeholder="0"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="thursday">Th</label>
                        <Input
                          type="number"
                          id="thursday"
                          placeholder="0"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="friday">F</label>
                        <Input
                          type="number"
                          id="friday"
                          placeholder="0"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="saturday">S</label>
                        <Input
                          type="number"
                          id="saturday"
                          placeholder="0"
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="sunday">Sn</label>
                        <Input
                          type="number"
                          id="sunday"
                          placeholder="0"
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col">
                        <label htmlFor="date">Start Date</label>
                        <Input
                          type="date"
                          id="date"
                          placeholder="0"
                          onChange={this.handleInputChange} />
                      </div>
                      <div className="form-group col">
                        <label htmlFor="project">Select Project</label>
                        <select className="form-control" id="project" onClick={this.handleInputChange}>
                          {this.state.projects.map(project => { return <option key={project.id} value={project.id}>{project.title}</option> })}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button onClick={this.handleSubmitTimesheet} type="submit" className="btn blue-btn" data-dismiss="modal">Save</button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default UserProfile;
