import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Form, FormGroup, Label, Input, Button, Small } from "../components/Form";

class Register extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    message: '',
    error: false,
    registerError: false,
    loginError: false,
    success: false,
  };

  handleInputChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
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
        showError: true,
        loginError: false,
        registerError: true,
      });
    }
    else {
      API.registerUser({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          success: true,
        });
      })
      .catch(error => {
        console.log(error.response.data);
          this.setState({
            message: error.response.data.message,
          });
      });
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h1>Registrations</h1>
            </Jumbotron>
            {this.state.success ? (
              <Redirect to="/ideas" />
            ) : (
              <Form>
                <FormGroup>
                  <Label for="firstname">First Name</Label>
                  <Input type="text" id="firstname" />
                </FormGroup>
                <FormGroup>
                  <Label for="lastname">Last Name</Label>
                  <Input type="text" id="lastname" />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" id="email" />
                  <Small>You must use your companies email to register.</Small>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" id="password" />
                  <Small>Authentication is secured with bcrypt and JWT.</Small>
                </FormGroup>
                <Button type="submit">Register</Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
