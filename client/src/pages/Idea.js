import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { Input, Button, FormGroup, Form, FormBtn, Label, TextArea } from "../components/Form";
import { VoteUpBtn, DropDownBtn, DropDown, VoteDownBtn } from "../components/Buttons";
// import { VoteUpBtn, ApproveBtn } from "../components/Buttons";
import { List, ListItem } from "../components/List";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";
import { ProjectDetailMainModal } from "../components/Modal";

//this page should display suggested projects and allow users to suggest new projects
//managers should be able to approve ideas, converting them to projects

class Ideas extends Component {
  state = {
    pageTitle: 'ProGro Ideas',
    user: this.props.user,
    ideas: [],
    title: '',
    description: '',
    editID:'',
    editTitle:'',
    editDescription:'',
    votes: []
  };

  componentDidMount() {
    document.title = this.state.pageTitle;
    this.loadIdeas();
  };

  //Display previous Ideas
  loadIdeas = () => {
    API
      .getIdeas()
      .then(res => {
        let votes = [];

        // Map res array
        res.data.map(idea => {
          //filter IdeaVotes array
          idea.IdeaVotes.filter(vote => {
            // Only get the ideaID's that the authenticated user has voted on
            if (vote.userID === this.state.user.id) {
              votes.push(vote.ideaID)
            }
          });
        });

        this.setState({
          ideas: res.data,
          title: '',
          description: '',
          votes
        })
      })
      .catch(err => console.log(err));
  };

  //Inputting New Ideas
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
        if (this.state.title && this.state.description) {
          API.submitIdea({
            title: this.state.title,
            description: this.state.description,
            ownerID: this.state.user.id
          })
          .then(res => this.loadIdeas())
          .catch(err => console.log(err));
        }
  };

  approveIdea = idea => {
    API.updateIdea({
      id: idea.id,
      endorsed: true
    })
      .then(res => this.convertIdea(idea))
      .then(res => this.loadIdeas())
      .catch(err => console.log(err));
  };

  convertIdea = idea => {
    API.createProject({
      title: idea.title,
      description: idea.description,
      ownerID: idea.ownerID
    })
      .catch(err => console.log(err));
  }

  deleteIdea = idea => {
    API.deleteIdea({
      id: idea.id
    })
      .then(res => this.loadIdeas())
      .catch(err => console.log(err));
  }

  setEditID = (editID) => {
    this.setState({ editID });
  }

  editIdea = event => {
    event.preventDefault();
    if (this.state.editTitle && this.state.editDescription) {
      let update = {
        id: this.state.editID,
        title: this.state.editTitle,
        description: this.state.editDescription
      }
      API.updateIdea(update)
      .then(res => this.loadIdeas())
      .catch(err => console.log(err));
    }
    if (this.state.editTitle) {
      let update = {
        id: this.state.editID,
        title: this.state.editTitle
      }
      API.updateIdea(update)
      .then(res => this.loadIdeas())
      .catch(err => console.log(err));
    }
    if (this.state.editDescription) {
      let update = {
        id: this.state.editID,
        description: this.state.editDescription
      }
      API.updateIdea(update)
      .then(res => this.loadIdeas())
      .catch(err => console.log(err));
    }

  }

  upvote = idea => {
    //Upvote an idea
    API.updateIdea({
      id: idea.id,
      voteCount: idea.voteCount + 1
    })
      .then(res => {
        // Add userID and ideaID to IdeaVotes table
        API
          .castVote(res.data.id, this.state.user.id)
          .then(() => this.loadIdeas())
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  downvote = idea => {
    API.updateIdea({
      id: idea.id,
      voteCount: idea.voteCount - 1
    })
      .then(res => {
        // Add userID and ideaID to IdeaVotes table
        API
          .castVote(res.data.id, this.state.user.id)
          .then(() => this.loadIdeas())
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
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
            <div id="new-idea-div">
              <Card >
                <Form>
                  <p className="field-head">New Project Title</p>
                  <Input
                    id="newProjectTitle"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title">
                  </Input>
                  <p className="field-head">Project Description</p>
                  <TextArea
                    id="newProjectDescription"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    rows="7"
                    name="description">
                  </TextArea>
                  <Button
                    type="submit"
                    onClick={this.handleFormSubmit}
                    className="btn blue-btn"
                  >
                  Submit
                  </Button>
                  <p id="subtext-blue">Share a new idea!</p>
                </Form>
              </Card>
              </div>
              <div id="ideas-div">
              <Card className="shade-box">
              <ProjectDetailMainModal />
                {this.state.ideas.length ? (
                  <List >
                    {this.state.ideas.map(idea => (
                      <ListItem key={idea.id}>
                        <div>
                          <div className="vote-block">
                            <VoteUpBtn
                              onClick={() => {
                                const {
                                  votes = []
                                } = this.state;

                                if (votes.indexOf(idea.id) === -1) {
                                  this.upvote(idea);
                                }
                              }}
                            >
                            </VoteUpBtn>
                            <div className="vote-count field-head">
                              {idea.voteCount}
                            </div>
                            <VoteDownBtn
                              onClick={() => {
                                const {
                                  votes = []
                                } = this.state;

                                if (votes.indexOf(idea.id) === -1) {
                                  this.downvote(idea);
                                }
                              }}
                            >
                            </VoteDownBtn>
                          </div>
                        </div>
                        <h2> {idea.title}</h2>
                        <p> {idea.description} </p>
                        {((this.state.user.permissionID === (2 || 3)) || (this.state.user.id === idea.ownerID)) &&
                          <DropDown>
                            {this.state.user.permissionID === (2 || 3) &&
                              <DropDownBtn
                                onClick={() => this.approveIdea(idea)}
                              >
                              <p>Approve</p>
                              </DropDownBtn>
                            }
                            {/*
                            <DropDownBtn
                              data-toggle="modal"
                              data-target="#editModal"
                            >
                            <p>Edit</p>
                            </DropDownBtn>
                            */}
                            {this.state.user.id === idea.ownerID &&
                              <DropDownBtn
                                onClick={() => this.deleteIdea(idea)}
                              >
                              <p>Delete</p>
                              </DropDownBtn>
                            }
                          </DropDown>
                        }
                        <div className="modal fade" id="editIdea" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editIdeaTitle">Edit</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                  <Form>
                                    <FormGroup>
                                      <Label htmfor="editedTitle">Title</Label>
                                      <Input
                                        type="text"
                                        id="editedTitle"
                                        name="editTitle"
                                        value={this.state.editTitle}
                                        placeholder={idea.title}
                                        onChange={this.handleInputChange}
                                      ></Input>
                                      <Label htmfor="editedDescription">Description</Label>
                                      <TextArea
                                        type="text"
                                        id="editedDescription"
                                        name="editDescription"
                                        value={this.editDescription}
                                        placeholder={idea.description}
                                        onChange={this.handleInputChange}
                                      ></TextArea>
                                    </FormGroup>
                                    <FormBtn
                                      className="btn blue-btn"
                                      type="submit"
                                      onClick={this.editIdea}
                                    >
                                      Submit
                                    </FormBtn>
                                  </Form>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default Ideas;
