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
                <a className="dropdown-item" href="#">edit</a>
                <a className="dropdown-item" href="#">delete</a>
            </div>
        </div>
    );
}