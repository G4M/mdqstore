import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ItemCount from '../ItemCount/ItemCount';
import { useCartContext } from '../../contexts/CartContext/CartContext';

function CartItem({ item }) {
    const { inmaxmin, updateCart } = useCartContext();

    const [thisCart, setthisCart] = useState(inmaxmin[0]);
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
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                        <p>description: {item.description} </p>
                        <p>price: {item.price} </p>
                        <p>discount: {item.discount} </p>
                    </Card.Text>
                    <ItemCount
                        inmaxmin={inmaxmin} thisCart={thisCart}
                        updateThisCart={updateThisCart} updateCart={updateCart}
                    />
                    <div className="mt-1">
                        <Button variant="success" block onClick={
                            () => (updateCart(item.categoryId, item.description, item.discount, item.id, item.image, item.price, item.stock, item.title, thisCart))}>
                            Add To Cart
                    </Button>
                    </div>

                </Card.Body>
            </div>
            </div>
        </React.Fragment>
    );
}

export default CartItem;