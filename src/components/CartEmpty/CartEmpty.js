import React from 'react';
import { Link } from 'react-router-dom';

export default function CartEmpty() {

    return (
        <div className="container-fluid">
            <div className="row col-12 justify-content-center">
            <img src="./images/cart.png" />
            <div className="row col-12 justify-content-center">
                <h1>Cart is Empty. Click <Link to={"/"}>Here </Link> to return shopping</h1>
            </div>
            </div>
        </div>

    )
}