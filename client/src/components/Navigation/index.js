import React from "react";

export function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a href="/profile" className="navbar-brand">ProGro</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="/profile">My Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/ideas">Ideas</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/projects">Projects</a>
      </li>
      </ul>
      </div>
</nav>
  );
}