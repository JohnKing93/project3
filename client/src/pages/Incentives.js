import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Card } from "../components/Card";
import { List, ListItem } from "../components/List";
import { Navigation } from "../components/Navigation";
import API from "../utils/API";
import { Input, FormGroup, Form, FormBtn, Label, TextArea } from "../components/Form";
import { DropDown, DropDownBtn } from "../components/Buttons";

class Incentives extends Component {

  state = {
    user: this.props.user,
    credits: 0,
    redeemedTotal: 0,
    selected: '',
    cost: 0,
    incentives: [],
    newTitle: '',
    newDescription: '',
    newPrice: ''
  }

  componentDidMount() {
    this.loadIncentives();
  }

  loadIncentives = () => {
    API.getIncentives()
      .then(res => {
        // let activeIncentives = res.data.filter(incentive => incentive.Status.description === 'Active');
        let activeIncentives = res.data;
        this.setState({ incentives: activeIncentives});
      })
      .then(
        this.loadCredits(this.state.user)
      )
      .catch(err => console.log(err));
  };

  loadCredits = (userId) => {
    API.getUser(userId)
      .then(res=> {
        let userCredits = res.data.hoursEarned - res.data.hoursRedeemed;
        this.setState({
          credits: userCredits,
          redeemedTotal: res.data.hoursRedeemed
        });
      })
      .catch(err => console.log(err));
  };

  removeIncentive = (incentiveId) => {
    API.updateIncentive({
      id: incentiveId,
      // status: archived
    })
      .then(res=> {
        this.loadIncentives();
      })
      .catch(err => console.log(err));
  };

  createIncentive = event => {
    event.preventDefault();
    if (this.state.newTitle && this.state.newDescription && this.state.newPrice) {
      let newIncentive = {
        title: this.state.newTitle,
        description: this.state.newDescription,
        price: parseFloat(this.state.newPrice)
      }
      API.createIncentive(newIncentive)
        .then(res => this.loadIncentives())
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSelect = (incentive) => {
    this.setState({
      selected: incentive.id,
      cost: incentive.price
     });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.selected) {
      let record = {
        incentiveId: this.state.selected,
        userID: this.state.user
      }
      API.redeemIncentive(record)
        .then( res => {
          let update = {
            id: this.state.user,
            hoursRedeemed: this.redeemedTotal + this.cost
          }
          API.updateUser(update)
        })
        .then(res => {
          this.loadCredits();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Container fluid>
          <Row>
            <Col size="md-2">
            </Col>
            <Col size="md-8">
              <div id="incentives-div">
                <Card>
                  <div className="top-right-drop">
                    <DropDown>
                      <DropDownBtn
                        data-toggle="modal"
                        data-target="#createincentive"
                      >
                        <p>Add New</p>
                      </DropDownBtn>
                    </DropDown>
                  </div>
                  <div className="modal fade" id="createincentive" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addIncentiveTitle">Add an Incentive</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                          <Form>
                            <FormGroup>
                              <Label htmfor="newIncentiveTitle">Incentive</Label>
                              <Input
                                type="text"
                                id="newIncentiveTitle"
                                name="newTitle"
                                value={this.state.newTitle}
                                onChange={this.handleInputChange}
                              ></Input>
                              <Label htmfor="newIncentivePrice">Price</Label>
                              <Input
                                type="text"
                                id="newIncentivePrice"
                                name="newPrice"
                                value={this.state.newPrice}
                                onChange={this.handleInputChange}
                              ></Input>
                              <Label htmfor="newIncentiveDescription">Description</Label>
                              <TextArea
                                type="text"
                                id="newIncentiveDescription"
                                name="newDescription"
                                value={this.newDescription}
                                onChange={this.handleInputChange}
                              ></TextArea>
                            </FormGroup>
                            <FormBtn
                              className="btn blue-btn"
                              type="submit"
                              onClick={this.createIncentive}
                            >
                              Submit
                            </FormBtn>
                            {/* <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button> */}
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3>Hours: {this.credits} </h3>
                  <p>Apply your credits by selecting an incentive and hitting submit.</p>
                  <div id="available-incentives-box">
                    <Form>
                      <FormGroup>
                        {this.state.incentives.length ? (
                          <List>
                            {this.state.incentives.map(incentive => (
                              <ListItem key={incentive.id}>
                                <div>
                                  <DropDown>
                                    <DropDownBtn
                                      // needs edit modal
                                    >
                                      <p>edit</p>
                                    </DropDownBtn>
                                    <DropDownBtn
                                      onClick={() => this.removeIncentive(incentive.id)}
                                    >
                                      <p>remove</p>
                                    </DropDownBtn>
                                    <DropDownBtn
                                      // needs on click to render all redeemed
                                    >
                                      <p>see history</p>
                                    </DropDownBtn>
                                  </DropDown>
                                  <h2> {incentive.title} </h2>
                                </div>
                                <div className="form-check">
                                  <Input
                                  className="form-check-input position-static"
                                  type="radio"
                                  name="selected"
                                  id= {incentive.id}
                                  value= {incentive.id}
                                  aria-label="select this"
                                  onClick={() => this.handleSelect(incentive)}
                                  />
                                </div>
                                <p> {incentive.description} </p>
                                <p> Cost: {incentive.price} </p>
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <h3>There are no incentives currently available.</h3>
                        )}
                      </FormGroup>
                      <FormBtn
                        className="btn blue-btn card-item-submit"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </FormBtn>
                    </Form>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

}

export default Incentives;
