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
