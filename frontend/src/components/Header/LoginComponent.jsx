import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginForm from "./LoginForm";

function Slidebar(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                login
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <LoginForm setLoggedIn={props.setLoggedIn} setUser={props.setUser} setPassword={props.setPassword} loginUser={props.loginUser} registerUser={props.registerUser}></LoginForm>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Slidebar