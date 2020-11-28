import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ItemCount from '../ItemCount/ItemCount';
import { useCartContext } from '../../contexts/CartContext/CartContext';

function ItemDetail({ itemId }) {

    const { inmaxmin, updateCart } = useCartContext();
    const [thisCart, setthisCart] = useState(inmaxmin[0]);
    function updateThisCart(count) {
        setthisCart(thisCart + count)
    }

    return (
        <React.Fragment>
            <div className="row">
            <div className="Item card col-3">
                <Card.Img variant="top" src={"." + itemId.image} />
            </div>
            <div className="Item card col-9">
                <Card.Body>
                    <Card.Title>{itemId.title}</Card.Title>
                    <Card.Text>
                        <p>description: {itemId.description} </p>
                        <p>price: {itemId.price} </p>
                        <p>discount: {itemId.discount} </p>
                    </Card.Text>
                    <ItemCount
                        inmaxmin={inmaxmin} thisCart={thisCart}
                        updateThisCart={updateThisCart} updateCart={updateCart}
                    />
                    <div className="mt-1">
                        <Button variant="success" block onClick={
                            () => (updateCart(itemId.categoryId, itemId.description, itemId.discount, itemId.id, itemId.image, itemId.price, itemId.stock, itemId.title, thisCart))}>
                            Add To Cart
                    </Button>
                    </div>

                </Card.Body>
            </div>
            </div>
        </React.Fragment>
    );
}

export default ItemDetail;
