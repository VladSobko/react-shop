import React from "react";

import ProductItem from "./ProductItem";

const ProductList = ({ productList, editProductSubmit, deleteProduct }) => {
  return (
    <tbody>
      {[...productList].map((item, index) => (
        <ProductItem
          key={index}
          product={item}
          index={index}
          editProductSubmit={editProductSubmit}
          deleteProduct={deleteProduct}
        />
      ))}
    </tbody>
  );
};

export default ProductList;
