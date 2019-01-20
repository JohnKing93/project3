import React from "react";
import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch,
  Popover,
  Menu,
  Position
} from "@blueprintjs/core";
import { Link } from "react-router-dom";
import "./style.css";

function Navigation() {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>App Name</Navbar.Heading>
        <Navbar.Divider />
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          <Button className="bp3-minimal" icon="home" text="Home" />
        </Link>
        <Link to="/ideas" className={window.location.pathname === "/ideas" ? "nav-link active" : "nav-link"}>
          <Button className="bp3-minimal" icon="lightbulb" text="Ideas" />
        </Link>
        <Link to="/projects" className={window.location.pathname === "/projects" ? "nav-link active" : "nav-link"}>
          <Button className="bp3-minimal" icon="projects" text="Projects" />
        </Link>
        <Link to="/incentives" className={window.location.pathname === "/incentives" ? "nav-link active" : "nav-link"}>
          <Button className="bp3-minimal" icon="shop" text="Incentives" />
        </Link>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover content={
            <Menu>
              <Menu.Item icon="person" text="Profile" />
              <Menu.Item icon="calendar" text="Timesheet" />
            </Menu>
          } position={Position.BOTTOM_LEFT}>
          <Link to="/user" className={window.location.pathname === "/user" ? "nav-link active" : "nav-link"}>
            <Button className="bp3-minimal" icon="user" />
          </Link>
        </Popover>
      </Navbar.Group>
    </Navbar>
  );
}

export default Navigation;
