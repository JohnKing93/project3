import React from "react";

export function Form(props) {
  return (
    <form>
      {props.children}
    </form>
  );
}

export function FormGroup(props) {
  return (
    <div className="form-group">
      {props.children}
    </div>
  );
}

export function Label(props) {
  return (
    <label {...props} >
      {props.children}
    </label>
  );
}

export function Input(props) {
  return (
      <input className="form-control" {...props} />
  );
}

export function Button(props) {
  return (
    <button {...props} >
      {props.children}
    </button>
  );
}

export function Small(props) {
  return (
    <small className="form-text text-muted" {...props}>
      {props.children}
    </small>
  );
}
