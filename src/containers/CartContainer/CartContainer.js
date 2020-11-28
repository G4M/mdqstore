import React, { useEffect, useState } from 'react';
import { useCartContext } from '../../contexts/CartContext/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import CartEmpty from '../../components/CartEmpty/CartEmpty';
import CheckOut from '../../components/CheckOut/CheckOut';

function CartContainer() {
    const { cartContent, updateCart } = useCartContext();
    const totals = cartContent[cartContent.length - 1];
    let showContent = cartContent;

    return ( showContent.length===1? <CartEmpty/> :
        <React.Fragment>
            <div className="row border m-3 justify-content-around">
            <h3 >Total Cart: ${totals.totalCash}</h3>
            <h4 >{totals.totalItems} items</h4>
            </div>
            {showContent.map((item, index) => <CartItem key={index} updateCart={updateCart} item={item} />)}
            <CheckOut/>
        </React.Fragment>
    )
}

export default CartContainer;