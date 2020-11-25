import React, { useEffect, useState } from 'react';
import { useCartContext } from '../../contexts/CartContext/CartContext';
import CartItem from '../../components/CartItem/CartItem';

function CartContainer() {
    const { cartContent, updateCart } = useCartContext();
    //const [showContent, setShowContent] = useState();
    const totals = cartContent[cartContent.length - 1];
    let showContent = cartContent;

    useEffect(() => {
        console.log(showContent);
    }, [])
    return (
        <React.Fragment>
            <h3>Total: {totals.totalCash}</h3>
            <h4>Items: {totals.totalItems}</h4>
            {showContent.map((item, index) => <CartItem key={index} updateCart={updateCart} item={item} />)}
        </React.Fragment>
    )
}

export default CartContainer;