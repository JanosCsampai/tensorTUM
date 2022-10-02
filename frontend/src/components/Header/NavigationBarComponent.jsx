import React, {Component, useState, useContext} from 'react';
import {Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas, Image} from "react-bootstrap";

import {Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../api/axios";
import AuthContext from "../../context/AuthContext";
import logo from "../logo.png"

export default function NavigationBarComponent(props) {
    const [logged_in, setLogin] = useState(props.logged_in);
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("access_token"));
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext)

    //<Slidebar setLoggedIn={this.props.setLoggedIn} setUser={this.props.setUser} setPassword={this.props.setPassword} loginUser={this.loginUser} registerUser={this.registerUser}/>

    function logout(navigate) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers.common["Authorization"] = "";
        //navigate("/login");
        setAuthenticated(null);
    }

    return (
        <>
            <Navbar bg="white" variant="white" style={{height: "6%"}}>
                <Container>
                    <Navbar.Brand className="me-3 p-0" style={{cursor: "pointer", height: "40px", width: "40px"}} onClick={props.showMenu}>
                        <Image fluid={true} src={logo}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={props.showLeaderboard}> Leaderboard </Nav.Link>
                        <Nav.Link onClick={props.clickedShowStatistics}> My Statistics </Nav.Link>
                    </Nav>

                    <Nav>
                        {authenticated == null ?
                            <Nav.Link onClick={() => { navigate("/login")} } className="b96-login">Log In</Nav.Link>
                            :
                            <Nav.Link onClick={() => logout(navigate)}> Log Out </Nav.Link>}
                    </Nav>

                </Container>
            </Navbar>
        </>

    );
}
