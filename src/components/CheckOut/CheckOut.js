import React, { useState } from 'react';
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

    function postOrder() {
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
                setOrders(id);
                updateStock();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
            })
    }

    function updateStock() {

        for (let index = 0; index < cartContent.length - 1; index++) {
            let item = cartContent[index];
            console.log(item);
            let article = GetDBFireBase().collection('Productos').doc(item.id);
            console.log(article);
            let transaction = GetDBFireBase().runTransaction(t => {
                return t.get(article)
                    .then(doc => {
                        let newStock = doc.data().stock - item.cant;
                        t.update(article, { stock: newStock });
                        return Promise.resolve('New Stock is' + newStock);
                    });
            }).then(result => {
                console.log(item.title);
                console.log('Transaction success', result);
            }).catch(err => {
                console.log('Transaction failure:', err);
            });

        }
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
                            <Button disabled={orders} variant="primary" onClick={() => (postOrder())} >
                                Confirm Order
                        </Button>
                            {orders ? <Form.Text className="text-muted">
                                Your Order Id is: {orders}
                            </Form.Text> :
                                <></>
                            }
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