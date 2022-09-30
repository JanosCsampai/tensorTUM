import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Slidebar() {
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
                    <Offcanvas.Title> Offcanvas </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                   Add text here
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Slidebar