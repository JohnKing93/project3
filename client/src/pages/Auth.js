import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Form, FormGroup, Label, Input, Button, Small } from "../components/Form";

class Register extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    message: '',
    success: false,
    register: false,
  };

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleFormChange = event => {
    this.setState({
      register: event
    })
  };

  handleRegisterUser = event => {
    event.preventDefault();
    if (
      this.state.firstname === '' ||
      this.state.lastname === '' ||
      this.state.email === '' ||
      this.state.password === ''
    ) {
      this.setState({
        message: "Please populate all fields"
      });
    }
    else {
      API.registerUser({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        username: this.state.email,
        password: this.state.password,
      })
        .then(res => {
          console.log(res.data);
          this.setState({
            message: "Please verify your email before logging in",
          });
        })
        .catch(error => {
          console.log(error.response.data);
          this.setState({
            message: error.response.data,
          });
        });
    }
  };

  handleLoginUser = event => {
    event.preventDefault();
    if (
      this.state.email === '' ||
      this.state.password === ''
    ) {
      this.setState({
        message: "Please populate all fields"
      });
    }
    else {
      API.loginUser({
        username: this.state.email,
        password: this.state.password,
      })
        .then(res => {
          console.log(res.data);
          /*
          this.setState({
            success: true,
          });
          */
        })
        .catch(error => {
          console.log(error.response.data);
          this.setState({
            message: error.response.data,
          });
        });
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
          </Col>
          <Col size="md-4">
            <Jumbotron>
              <h1>Step Up</h1>
            </Jumbotron>
            {this.state.success ? (
              <Redirect to="/ideas" />
            ) : (
                <Form onSubmit={this.state.register ? this.handleRegisterUser : this.handleLoginUser}>
                  {this.state.message &&
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  }
                  {this.state.register &&
                    <div>
                      <FormGroup>
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                          type="text"
                          id="firstname"
                          value={this.state.firstname}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input
                          type="text"
                          id="lastname"
                          value={this.state.lastname}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                    </div>
                  }
                  <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                    <Small>Please use a corporate email address.</Small>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      onChange={this.handleInputChange}
                    />
                    <Small>Authentication is secured with bcrypt and JWT.</Small>
                  </FormGroup>
                  <Button type="submit" className="btn btn-primary">
                    {this.state.register ? "Register" : "Login"}
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-link"
                    onClick={() => this.handleFormChange(this.state.register ? false : true)}
                  >
                    {this.state.register ? "Already have an account?" : "Need to register?"}
                  </Button>
                </Form>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
