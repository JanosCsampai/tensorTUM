import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginForm from "./LoginForm";
import AuthAccount from "../account/account";
import Login from "../account/login/login";
import Register from "../account/register/register";

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
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Slidebar