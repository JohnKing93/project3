import React from "react";
// import { Input, FormGroup, Label, Form, FormBtn, TextArea, CheckBox } from "../Form";
import { Input, FormGroup, Label, Form, FormBtn, TextArea } from "../Form";

export function ProjectDetailMainModal() {
    return (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit this project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <FormGroup>
                                <Label htmfor="Project Title">Project Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmfor="Project Title">Project Description</Label>
                                <TextArea
                                    type="text"
                                    id="title"
                                ></TextArea>
                            </FormGroup>
                            <FormBtn>Submit</FormBtn>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProjectRoleEditModal() {
    return (
        <div className="modal fade" id="roleeditModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit this project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <FormGroup>
                                <Label htmfor="Role Title">Role Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                ></Input>
                            </FormGroup>
                            <FormBtn>Submit</FormBtn>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function RoleApplicantModal() {
    return (
        <div className="modal fade" id="applicantModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit this project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <FormGroup>
                                <Label htmfor="Applicants">Applicants</Label>
                                {/* {this.state.ideas.length ? (
                                    <List >
                                        {this.state.ideas.map(idea => (
                                            <ListItem key={}>
                                                <CheckBox />
                                                <p>
                                                    {/* {project applicant name} */}
                                                {/* </p> */}
                                            {/* </ListItem> */}
                                        {/* ))} */}
                                    {/* </List> */}
                            </FormGroup>
                            <FormBtn>Submit</FormBtn>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function MilestoneEditModal() {
    return (
        <div className="modal fade" id="roleeditModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit this project</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <FormGroup>
                                <Label htmfor="Milestone Title">Milestone</Label>
                                <Input
                                    type="text"
                                    id="title"
                                ></Input>
                            </FormGroup>
                            <FormBtn>Submit</FormBtn>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function NewIncentiveModal() {
  return (
      <div className="modal fade" id="newincentiveModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add an Incentive</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                      <Form>
                          <FormGroup>
                              <Label htmfor="newTitle">Incentive</Label>
                              <Input
                                  type="text"
                                  id="newTitle"
                              ></Input>
                              <Label htmfor="newDescription">Description</Label>
                              <TextArea
                                  type="text"
                                  id="newDescription"
                              ></TextArea>
                          </FormGroup>
                          <FormBtn>Submit</FormBtn>
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      </Form>
                  </div>
              </div>
          </div>
      </div>
  );
}
