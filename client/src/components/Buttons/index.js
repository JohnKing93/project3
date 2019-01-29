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
            <a className="dropdown-item" href="google.com">edit</a>
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

export function RoleDropBtn(props) {
  return (
    <div className="dropdown" {...props}>
            <button
                className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Options
  </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">edit</a>
                <a className="dropdown-item" href="#">delete</a>
                <a className="dropdown-item" href="#">applicants</a>
            </div>
        </div>
  );
}