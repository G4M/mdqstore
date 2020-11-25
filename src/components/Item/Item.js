import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ItemCount from '../ItemCount/ItemCount';
import { useCartContext } from '../../contexts/CartContext/CartContext';
import { Link } from 'react-router-dom';

function Item({ categoryId, description, discount, id, image, price, stock, title }) {
    const { inmaxmin, updateCart } = useCartContext();
    const [thisCart, setthisCart] = useState(inmaxmin[0]);
    function updateThisCart(count) {
        setthisCart(thisCart + count)
    }
    return (
        <div className="Item card col-md-2 col-sm-6 col-xs-12 mt-1">
            <Link to={"/item/"+id}> 
                <Card.Img variant="top" src={image} />
            </Link>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <p>description: {description} </p>
                    <p>price: {price} </p>
                    <p>discount: {discount} </p>
                </Card.Text>
                <ItemCount
                    inmaxmin={inmaxmin} thisCart={thisCart}
                    updateThisCart={updateThisCart} updateCart={updateCart}
                />
                <div className="mt-1">
                    <Button variant="success" block onClick={
                        () => (updateCart(categoryId, description, discount, id, image, price, stock, title, thisCart))}>
                        Add To Cart
                    </Button>
                </div>

            </Card.Body>
        </div>
    );
}

export default Item;