import React, { Component } from "react";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Form, FormGroup, Label, Input, Button, Small } from "../components/Form";
import { Card } from "../components/Card";

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    message: '',
    success: false,
    register: false,
  };

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleFormChange = event => {
    this.setState({ register: event })
  };

  handleRegisterUser = event => {
    event.preventDefault();
    // Destructure this.state
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    if (firstName === '' || lastName === '' || email === '' || password === '') {
      this.setState({ message: "Please populate all fields" });
    } else {
      API
        .registerUser({
          firstName,
          lastName,
          email,
          username: email,
          password,
        })
        .then(res => {
          // console.log(res.data);
          this.setState({ message: res.data.message });
        })
        .catch(err => {
          // console.log(err.response.data.message);
          this.setState({ message: err.response.data.message });
        });
    }
  };

  handleLoginUser = event => {
    event.preventDefault();
    // Destructure this.state
    const {
      email,
      password,
    } = this.state;

    if (email === '' || password === '') {
      this.setState({ message: "Please populate all fields" });
    } else {
      API
        .loginUser({
          username: email,
          password,
        })
        .then(() => {
          // console.log(res.data);
          this.setState({ success: true });
        })
        .catch(err => {
          // console.log(error.response.data.message);
          this.setState({ message: err.response.data.message });
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
          <div id="login-card">
          <Card>
            <div id="login-head">
              <h1>ProGro</h1>
              <h2>Take Initiative.</h2>
            </div>
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
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          type="text"
                          id="firstName"
                          value={this.state.firstName}
                          onChange={this.handleInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          type="text"
                          id="lastName"
                          value={this.state.lastName}
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
                  <div className="text-center">
                  <Button type="submit" className="btn blue-btn">
                    {this.state.register ? "Register" : "Login"}
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-link"
                    id="my-link-btn"
                    onClick={() => this.handleFormChange(this.state.register ? false : true)}
                  >
                    {this.state.register ? "Already have an account?" : "Need to register?"}
                  </Button>
                  </div>
                </Form>
              )}
              </Card>
              </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
