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
<<<<<<< HEAD
    <div className="card bg-light mb-3">
=======
    <div className="card bg-light mb-3" style={{maxWidth: 17 + 'rem'}}>
>>>>>>> master
      {props.children}
    </div>
  );
}

export function MemberCard(props) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.membersName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.membersPosition}</h6>
          <a href="/profile" className="card-link">See members profile</a>
        </div>
        {props.children}
      </div>
    </>
  );
}

export function MemberCardListGroup(props) {
  return (
    <ul className="list-group list-group-flush">
      {props.children}
    </ul>
  );
}

export function MemberCardListItem(props) {
  return (
    <li className="list-group-item">
      {props.roleName}
      {props.children}
    </li>
  );
}

export function ColorCardBody(props) {
  return (
      <div className="card-body">
        <h5 className="card-title">{props.roleTitle}{props.children}</h5>
        <p className="card-text">{props.description}</p>
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
