import React from "react";

export function VoteUpBtn(props) {
  return (
    <span className="btn" {...props} role="button">
      up
    </span>
  );
}

export function VoteDownBtn(props) {
  return (
    <span className="btn" {...props} role="button">
      down
    </span>
  );
}

export function DropDownBtn(props) {
  return (
    <div className="dropdown" {...props}>
      <button
          className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Options
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <span className="dropdown-item" data-toggle="modal" data-target="#editModal">edit</span>
          <a className="dropdown-item" href="google.com">delete</a>
      </div>
    </div>
  );
}

export function DetailBtn(props) {
  return (
    <span className="btn" {...props} role="button">
      Details
    </span>
  );
}

export function EditBtn(props) {
  return (
    <span className="btn" {...props}>
    edit
    </span>
  );
}

export function ApproveBtn(props) {
  return (
    <span className="btn" {...props}>
    Approve
    </span>
  );
}

export function IdeaDropDown(props) {
  return (
    <div className="dropdown">
      <button
          className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Options
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {props.children}
      </div>
    </div>
  );
}

export function IdeaDropDownBtn(props) {
  return (
  /*<span className="dropdown-item" data-toggle="modal" data-target="#editModal">edit</span>*/
    <span className="dropdown-item" {...props}>{props.children}</span>
  );
}

export function RoleDropBtn(props) {
  return (
    <div className="dropdown" {...props}>
            <button
                className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Options
  </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <span className="dropdown-item" data-toggle="modal" data-target="#RoleEditModal">edit</span>
                <span className="dropdown-item">delete</span>
                <span className="dropdown-item" data-toggle="modal" data-target="#ApplicantModal">applicants</span>
            </div>
        </div>
  );
}

export function MilestoneDropBtn(props) {
  return (
    <div className="dropdown" {...props}>
            <button
                className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Options
  </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <span className="dropdown-item" data-toggle="modal" data-target="#MilestoneEditModal">edit</span>
                <span className="dropdown-item">delete</span>
            </div>
        </div>
  );
}
