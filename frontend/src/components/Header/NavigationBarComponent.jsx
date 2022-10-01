import React, {Component, useState} from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import Swal from "sweetalert2"
import SlidingPane from "react-sliding-pane";
import Slidebar from "./LoginComponent";
import Login from "../account/login/login";
import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../api/axios";

export default function NavigationBarComponent(props) {
    const [logged_in, setLogin] = useState(props.logged_in);
    const authenticated = localStorage.getItem("access_token")
    const navigate = useNavigate();

    //<Slidebar setLoggedIn={this.props.setLoggedIn} setUser={this.props.setUser} setPassword={this.props.setPassword} loginUser={this.loginUser} registerUser={this.registerUser}/>

    function logout(navigate) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers.common["Authorization"] = "";
        navigate("/login");
    }

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand>Beat the Med Student </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={props.clickedNewGame}> Start Game </Nav.Link>
                        <Nav.Link onClick={props.showLeaderboard}> View Leaderboard </Nav.Link>
                    </Nav>

                    <Nav>
                        {authenticated == null ? <Link to="/login" className="b96-login">Log In</Link> :
                            <button className="b96-login" onClick={() => logout(navigate)}>Log Out</button>}
                    </Nav>

                </Container>
            </Navbar>
        </div>

    );
}
