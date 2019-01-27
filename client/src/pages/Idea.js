import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, TextArea, Button } from "../components/Form";
// import { VoteUpBtn, VoteDownBtn, DropDownBtn } from "../components/Buttons";
// import { List, ListItem } from "../components/List";
import { List } from "../components/List";
// import { Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";

//this page should display suggested projects and allow users to suggest new projects

//Submit Idea

//Display Previous Ideas
class Ideas extends Component {
  render() {
    return (
      <div>
        <Navigation ></Navigation>
        <Container fluid>
          <Row>
            <Col size="md-9">
              <Card >
                <form>
                  <p>Title</p>
                  <Input id="newProjectTitle"></Input>
                  <p>Project Description</p>
                  <TextArea id="newProjectDescription"></TextArea>
                  <Button type="submit">Submit</Button>
                </form>
              </Card>
              <Card >
                <List >
                  This is where the projects info will populate
                  Change what you need to
                  {/* {this.state.projects.map(project => (
                    <ListItem key={project._id}>
                      <Link to={"/projects/" + project._id}>
                      <VoteUpBtn ></VoteUpBtn>
                        <h2>
                          {project.title}
                        </h2>
                        <p>
                          {project.description}
                        </p>
                        <DropDownBtn ></DropDownBtn>
                      </Link>
                    </ListItem>
                  ))} */}
                </List>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Ideas;
