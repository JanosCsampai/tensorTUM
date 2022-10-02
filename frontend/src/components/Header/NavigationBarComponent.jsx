import React, {Component, useState, useContext} from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";

import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../api/axios";
import AuthContext from "../../context/AuthContext";

export default function NavigationBarComponent(props) {
    const [logged_in, setLogin] = useState(props.logged_in);
    const authenticated = localStorage.getItem("access_token")
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext)
    console.log(user)

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
                    <Navbar.Brand onClick={props.showLogo}>Beat the Med Student {user ? user.user_name : null}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={props.clickedNewGame}> Start Game </Nav.Link>
                        <Nav.Link onClick={props.showLeaderboard}> View Leaderboard </Nav.Link>
                    </Nav>

                    <Nav>
                        {authenticated == null ?
                            <Nav.Link onClick={() => { navigate("/login")} } className="b96-login">Log In</Nav.Link>
                            :
                            <Nav.Link onClick={() => logout(navigate)}> Log Out </Nav.Link>}
                    </Nav>

                </Container>
            </Navbar>
        </div>

    );
}
