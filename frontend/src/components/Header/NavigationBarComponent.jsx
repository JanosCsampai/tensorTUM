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

    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark" >
                    <Container>
                        <Navbar.Brand>Beat the Med Student </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={this.props.clickedNewGame}> Start Game </Nav.Link>
                            <Nav.Link onClick={this.props.showLeaderboard}> View Leaderboard </Nav.Link>
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