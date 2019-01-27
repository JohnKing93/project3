import React, { Component } from "react";
import { Navigation } from "../components/Navigation";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, FormBtn } from "../components/Form";

class Login extends Component {
  render() {
    return (
    <div>
<Navigation ></Navigation>
        <Container fluid>
          <Row>
            <Col size="md-6">
            <Card >
              <h1>ProGro</h1>
              <h3>Take Initiative.</h3>
              <h4>Not a member yet? <a href="/Register">Sign up!</a></h4>
              <form>
              <h2 type="username">Username</h2>
              <Input type="password"></Input>
              <h2>Password</h2>
              <Input ></Input>
              <p>Forgot my Password</p>
              <FormBtn type="submit">Login</FormBtn>
              </form>
            </Card>
            </Col>
            </Row>
            </Container>
    </div>
  );
}
}

export default Login;
