import React from "react";
import styles from "./Products.module.css";

import { connect } from "react-redux";

import Product from "./Product/Product";
import Navbar from "../Navbar/Navbar";

const Products = ({ products }) => {
  return (
    <>
      <Navbar />
      <div className={styles.products}>
        {products.map(product => (
          <Product key={product.id} productData={product} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    products: state.shop.products
  };
};

export default connect(mapStateToProps)(Products);
