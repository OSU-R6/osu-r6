import React from 'react';
import {Nav, NavDropdown, Dropdown, Container, Form, Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import {FiMenu} from 'react-icons/fi';

function Navigation() {
  return (
    <Navbar className="nav px-4">
        <Navbar.Brand href="/">
            <img
              src="/images/image6.png"
              height="125em"
              width="125em"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
            <Nav className="justify-content-end " activeKey="/home">
                {/* <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/About">Program</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <Dropdown align="end">
                        <Dropdown.Toggle>
                            <FiMenu />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Header>Information</Dropdown.Header>
                            <Dropdown.Item href="/About">The Program</Dropdown.Item>
                            <Dropdown.Item eventKey="4.2">Try Out</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Active Rosters</Dropdown.Header>
                            <Dropdown.Item eventKey="4.1">Black Team</Dropdown.Item>
                            <Dropdown.Item eventKey="4.2">Orange Team</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Other</Dropdown.Header>
                            <Dropdown.Item href="/Coaching">Coaches</Dropdown.Item>
                            <Dropdown.Item href="/Alumni">Alumni</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav.Item>
            </Nav>
       </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;