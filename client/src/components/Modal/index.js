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

export function TimesheetModal() {
  return (
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col">
                  <label for="monday-input">M</label>
                  <input type="number" className="form-control" id="monday-input" placeholder="0" />
                </div>
                <div class="form-group col">
                  <label for="tuesday-input">T</label>
                  <input type="number" class="form-control" id="tuesday-input" placeholder="0" />
                </div>
                <div class="form-group col">
                  <label for="wednesday-input">W</label>
                  <input type="number" class="form-control" id="wednesday-input" placeholder="0" />
                </div>
                <div class="form-group col">
                  <label for="thursday-input">Th</label>
                  <input type="number" class="form-control" id="thursday-input" placeholder="0" />
                </div>
                <div class="form-group col">
                  <label for="friday-input">F</label>
                  <input type="number" class="form-control" id="friday-input" placeholder="0" />
                </div>
                <div class="form-group col">
                  <label for="saturday-input">S</label>
                  <input type="number" class="form-control" id="saturday-input" placeholder="0" />
                </div>
                <div class="form-group col">
                  <label for="sunday-input">Sn</label>
                  <input type="number" class="form-control" id="sunday-input" placeholder="0" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
