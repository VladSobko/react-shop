import React, { Component } from "react";
import ProductItem from "./ProductItem";

export default class ProductList extends Component {
  render() {
    let products = this.props.productList;
    console.log(this.props)
    const trItem = products.map((item, index) => (
      <ProductItem
        key={index}
        product={item}
        index={index}
        editProductSubmit={this.props.editProductSubmit}
        deleteProduct={this.props.deleteProduct}
      />
    ));
    return <tbody>{trItem}</tbody>;
  }
}
