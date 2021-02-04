import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ productList, editProductSubmit, deleteProduct }) => {
  let products = productList;
  const trItem = products.map((item, index) => (
    <ProductItem
      key={index}
      product={item}
      index={index}
      editProductSubmit={editProductSubmit}
      deleteProduct={deleteProduct}
    />
  ));
  return <tbody>{trItem}</tbody>;
};

export default ProductList;
