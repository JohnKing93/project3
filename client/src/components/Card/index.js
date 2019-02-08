import React from "react";

export function ColorCard(props) {
  return (
    <div className="card text-white bg-dark mb-3" style="max-width: 18rem;">
      {props.children}
    </div>
  );
}

export function ColorCardBody(props) {
  return (
      <div className="card-body">
        <h5 className="card-title">{props.title}{props.children}</h5>
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
