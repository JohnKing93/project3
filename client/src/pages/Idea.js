import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, TextArea, Button } from "../components/Form";
import { VoteUpBtn, DropDownBtn } from "../components/Buttons";
import { List, ListItem } from "../components/List";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";

//this page should display suggested projects and allow users to suggest new projects

class Ideas extends Component {

  state = {
    ideas: [],
    // _id: '',
    title: '',
    description: ''
  };

  componentDidMount() {
    this.loadIdeas();
  };

  //Display previous Ideas
  loadIdeas = () => {
    API.getIdeas()
      .then(res =>
        this.setState({
          ideas:res.data,
          title: '',
          description: ''
        })
    )
    .catch(err => console.log(err));
  };

  //Inputting New Ideas
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.description) {
      API.submitIdea({
        title: this.state.title,
        description: this.state.description
      })
      .then(res => this.loadIdeas())
      .catch(err => console.log(err));
    }
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
                {this.state.ideas.length ? (
                  <List >
                    {this.state.ideas.map(idea => (
                      <ListItem key={idea.id}>
                        <VoteUpBtn ></VoteUpBtn>
                        <h2>
                          {idea.title}
                        </h2>
                        <p>
                          {idea.description}
                        </p>
                        <DropDownBtn ></DropDownBtn>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Ideas;
