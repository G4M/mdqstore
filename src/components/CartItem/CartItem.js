import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ItemCount from '../ItemCount/ItemCount';
import { useCartContext } from '../../contexts/CartContext/CartContext';

function CartItem({ item }) {
    const { inmaxmin, killCartItem, updateCart } = useCartContext();

    const [thisCart, setthisCart] = useState(item.cant);
    function updateThisCart(count) {
        setthisCart(thisCart + count)
    }

    return ( item.totalCash? <></> :
        <React.Fragment>
            <div className="row">
            <div className="Item card col-2">
                <Card.Img variant="top" src={"." + item.image} />
            </div>
            <div className="Item card col-10">
                <Card.Body>
                <button className="btn btn-danger float-right" onClick={() => killCartItem(item.id)}>x</button>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        <p>Description: {item.description} </p>
                        <div className="row border">
                        <p className="col-4">Price: ${item.price} </p>
                        <p className="col-4">-{item.discount}%</p>
                        <p className="col-2">=</p>
                        <p className="col-2">{item.price*((100-item.discount)/100)}</p>
                        </div>
                        <div className="row mt-2 justify-content-around">
                        <p >Quantity: {item.cant}</p>
                    <ItemCount
                        inmaxmin={inmaxmin} thisCart={thisCart}
                        updateThisCart={updateThisCart} updateCart={updateCart}
                    />
                        <p >Total $ {item.price*((100-item.discount)/100)*item.cant}</p>
                        </div>
                    </Card.Text>
                    <div className="mt-1">
                        <Button variant="success" block onClick={
                            () => (updateCart(item.categoryId, item.description, item.discount, 
                                    item.id, item.image, item.price, item.stock, item.title, 
                                    thisCart-item.cant))}>
                            Modfy Cart
                    </Button>
                    </div>

                </Card.Body>
            </div>
            </div>
        </React.Fragment>
    );
}

export default CartItem;