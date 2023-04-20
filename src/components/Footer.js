import React from 'react';
import {Nav, NavDropdown, Dropdown, Container, Form, Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { BsDiscord, BsInstagram } from "react-icons/bs";

function Footer() {
    return (
        <div class ="footer">
            <Navbar>
                <Navbar.Collapse className="justify-content-center">
                        <Nav>
                            <Nav.Item>
                                <div class="icon mx-2"><Nav.Link href="https://discord.gg/zYgcRtxsGv" target="_blank"><BsDiscord /></Nav.Link></div>
                            </Nav.Item>
                            <Nav.Item>
                                <div class="icon mx-2"><Nav.Link href="#" target="_blank"><BsInstagram /></Nav.Link></div>
                            </Nav.Item>
                        </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar>
                <Navbar.Collapse className="justify-content-center">
                    <Nav>

                        <Nav.Item>
                        &copy; Oregon State Rainbow Six
                        </Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}; 

export default Footer;