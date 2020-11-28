import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCartContext } from '../../contexts/CartContext/CartContext';
import { GetDBFireBase } from "../../Tools/firebase";
import firebase from "firebase";
import "firebase/firestore";

function CheckOut() {
    const { cartContent } = useCartContext();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [orders, setOrders] = useState(false);

    function postOrder(evnt) {
        evnt.preventDefault();
        const userInfo = {
            "name": document.getElementById("formName").value,
            "phone": document.getElementById("formCellphone").value,
            "email": document.getElementById("formEmail").value
        }
        const total = cartContent[cartContent.length - 1];
        let itemsPost = []

        for (let index = 0; index < cartContent.length - 1; index++) {
            let item = cartContent[index];
            itemsPost.push(
                { "cant": item.cant, "id": item.id, "price": item.price, "discount": item.discount, "title": item.title })
        }
        let postData = {
            "buyer": userInfo,
            "items": itemsPost,
            "date": firebase.firestore.Timestamp.fromDate(new Date()),
            "total": total
        };

        const getOrders = GetDBFireBase().collection("Orders");
        getOrders.add(postData)
            .then(({ id }) => {
                setOrders(id)
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                //if (orders) { updateStock() }
            })
    }


    return (
        <React.Fragment>
            <div className="container mt-5">
                <Button id="checkButton" size="lg" variant="warning" onClick={handleShow} block>
                    CheckOut
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>CheckOut</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form>
                        <Form.Row>
                            <Form.Group controlId="formName">
                                <Form.Label>Name: </Form.Label>
                                <Form.Control type="text" placeholder="Enter your Name" required />
                            </Form.Group>
                            <Form.Group controlId="formCellphone">
                                <Form.Label>Cell Phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter your Cell Phone Number" required />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" required />
                            <Form.Text className="text-muted">
                                We'll never share your email or personal information with anyone else.
                    </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(evnt) => (postOrder(evnt))} >
                            Confirm Order
                        </Button>
                        <Button variant="primary" onClick={() => (alert(orders))} >
                            view Order
                        </Button>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default CheckOut;