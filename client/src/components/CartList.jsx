import React from 'react';
import { useSelector } from 'react-redux';
import CartListItems from './CartListItems';

const CartList = () => {
    const carts = useSelector((state) => state.cartState.CartItems);

    return (
        <>
            {carts.map((item) => (
                <CartListItems cartItem={item} key={item.cartId} />
            ))}
        </>
    );
};

export default CartList;
