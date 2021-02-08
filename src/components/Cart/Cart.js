import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CartItem from "./CartItem/CartItem";
import Navbar from "../Navbar/Navbar";

import styles from "./Cart.module.css";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const items = cart.reduce((items, item) => items + item.qty, 0);
    const price = cart.reduce((price, item) => price + item.qty * item.price, 0);

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems]);

  const CartItems = () => {
    return cart.map((item) => <CartItem key={item.id} itemData={item} />);
  };

  return (
    <>
      <Navbar />
      <div className={styles.cart}>
        <div className={styles.cart__items}>
          <CartItems />
        </div>
        <div className={styles.cart__summary}>
          <h4 className={styles.summary__title}>Cart Summary</h4>
          <div className={styles.summary__price}>
            <span>TOTAL: ({totalItems} items)</span>
            <span>$ {totalPrice}</span>
          </div>
          <button className={styles.summary__checkoutBtn}>
            Proceed To Checkout
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Cart);
