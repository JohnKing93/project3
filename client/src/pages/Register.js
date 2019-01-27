import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, CheckBox, FormBtn } from "../components/Form";
import { Navigation } from "../components/Navigation";

//this page should display suggested projects and allow users to suggest new projects

//Submit Idea

//Display Previous Ideas
class Register extends Component {
  render() {
    return (
      <div>
        <Navigation ></Navigation>
        <Container fluid>
          <Row>
            <Col size="md-9">
              <Card >
                <h1>Welcome to ProGro!</h1>
                <form>
                  <p>First Name</p>
                  <Input ></Input>
                  <p>Last Name</p>
                  <Input ></Input>
                  <p>Email</p>
                  <Input ></Input>
                  <p>Password</p>
                  <Input ></Input>
                  <p>Confirm Password</p>
                  <Input ></Input>
                  <p>Position</p>
                  <Input ></Input>
                  <CheckBox >Manager</CheckBox>
                  <p>Skills</p>
                  <Input ></Input>
                  <FormBtn>Submit</FormBtn>
                </form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;