import React, {Component} from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import Swal from "sweetalert2"
import SlidingPane from "react-sliding-pane";
import Slidebar from "./LoginComponent";

class NavigationBarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: false,
            username_fail: false,
            password_fail: false,
            userid: "",
            show_login: true
        }

    }


    componentDidMount() {
    }

    dummy = () => {
    }

    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark" >
                    <Container>
                        <Navbar.Brand>Beat the Med</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={this.dummy}> Start Game </Nav.Link>
                            <Nav.Link> View Leaderboard </Nav.Link>
                        </Nav>

                        <Nav>
                           <Slidebar></Slidebar>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBarComponent;