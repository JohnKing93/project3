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
    <div className="card bg-light mb-3" style={{maxWidth: 18 + 'rem'}}>
      {props.children}
    </div>
  );
}

export function MemberCard(props) {
  return (
    <>
      <div className="card" style={{width: 18 + 'rem'}}>
        <div className="card-body">
          <h5 className="card-title">{props.membersName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.membersPosition}</h6>
          <a href="/profile" class="card-link">See members profile</a>
        </div>
        {props.children}
      </div>
    </>
  );
}

export function MemberCardListGroup(props) {
  return (
    <ul class="list-group list-group-flush">
      {props.children}
    </ul>
  );
}

export function MemberCardListItem(props) {
  return (
    <li class="list-group-item">
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
