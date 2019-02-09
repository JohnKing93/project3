import React from "react";

export function Card({ children }) {
  return (
      <div className="card">
          <div className="card-body">
          {children}
          </div>
      </div>
  );
}

export function ColorCard(props) {
  return (
    <div className="card bg-light mb-2 my-list-item">
      {props.children}
    </div>
  );
}

export function MemberCard(props) {
  return (
    <>
      <div className="card member-card">
        <div className="card-body">
          <a href="/profile" className="btn blue-btn float-right"> View Profile</a>
          <h5 className="card-title">{props.membersName}</h5>
          <h6 className="card-subtitle mb-2">{props.membersPosition}</h6>
        </div>
        {props.children}
      </div>
    </>
  );
}

export function MemberCardListGroup(props) {
  return (
    <ul className="list-group">
      {props.children}
    </ul>
  );
}

export function MemberCardListItem(props) {
  return (
    <li className="list-group-item no-border">
      {props.roleName}
      {props.children}
    </li>
  );
}

export function ColorCardBody(props) {
  return (
      <div className="card-body">
        <h2 className="card-title">{props.roleTitle}{props.children}</h2>
        <p className="card-text listed-details">{props.description}</p>
      </div>
  );
}

export function ColorCardFooter(props) {
  return (
    <div className="card-footer">
      {props.children}
    </div>
  );
}
