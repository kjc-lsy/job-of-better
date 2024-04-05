/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import {Container, Nav, NavItem, NavLink} from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="/">
              job-of-better
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
                href="https://github.com/dealim/job-of-better"
                target="_blank"
            >
              Github
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made by{" "}
          <a
            href=""
            target="_blank"
          >
            kjc, lsy
          </a>{" "}
          for a better job consulting.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
