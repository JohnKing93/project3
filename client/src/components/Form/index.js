import React from "react";

export function Form(props) {
  return (
    <form {...props}>
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

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function Button(props) {
  return (
    <button {...props} >
      {props.children}
    </button>
  );
}

export function CheckBox(props) {
  return (
    <div className="form-group form-check">
      <input type="checkbox" className="form-check-input" />
        <label className="form-check-label">{props.children}</label>
    </div>
      );
}

export function FormBtn(props) {
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
