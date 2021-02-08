import React, { Component } from "react";

import styles from "./ProductItem.module.css";

const ProductItemView = ({
  index,
  title,
  description,
  price,
  image,
  openEditingMode,
  deleteProduct,
}) => {
  return (
    <div className={"my-3"} key={index}>
      <label className={styles.title}>{title}</label>
      <label className={styles.desc}>{description}</label>
      <label className={"mx-5"}>{price}</label>
      <label className={styles.image}>{image}</label>
      <button className="btn btn-warning mx-2" onClick={openEditingMode}>
        Edit
      </button>
      <button className="btn btn-danger mx-2" onClick={deleteProduct}>
        Delete
      </button>
    </div>
  );
};

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      title: this.props.product.title,
      description: this.props.product.description,
      price: this.props.product.price,
      image: this.props.product.image,
    };
    this.openEditingMode = this.openEditingMode.bind(this);
    this.editProductSubmit = this.editProductSubmit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  deleteProduct() {
    const { id } = this.props.product;
    this.props.deleteProduct(id);
  }

  openEditingMode() {
    this.setState((prevState) => ({
      isEdit: !prevState.isEdit,
    }));
  }

  editProductSubmit() {
    this.setState((prevState) => ({
      isEdit: !prevState.isEdit,
    }));
    this.props.editProductSubmit(
      this.props.product.id,
      this.state.title,
      this.state.description,
      this.state.price,
      this.state.image
    );
  }

  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }

  render() {
    const { index, title, description, price, image } = this.props.product;
    const { isEdit } = this.state;
    return isEdit ? (
      <form className="bg-warning my-2" key={index}>
        <input
          className={styles.titleInp}
          name="title"
          type="text"
          value={this.state.title}
          onChange={(event) => this.handleChange(event, "title")}
          defaultValue={title}
        />
        <input
          className={styles.descInp}
          name="description"
          defaultValue={description}
          type="text"
          value={this.state.description}
          onChange={(event) => this.handleChange(event, "description")}
        />
        <input
          className={styles.priceInp}
          name="price"
          type="text"
          value={this.state.price}
          onChange={(event) => this.handleChange(event, "price")}
          defaultValue={price}
        />
        <input
          className={styles.imageInp}
          name="image"
          type="text"
          value={this.state.image}
          onChange={(event) => this.handleChange(event, "image")}
          defaultValue={image}
        />
        <button
          className="btn btn-primary mx-5"
          onClick={this.editProductSubmit}
        >
          Save
        </button>
      </form>
    ) : (
      <ProductItemView
        index={index}
        title={title}
        description={description}
        image={image}
        price={price}
        deleteProduct={this.deleteProduct}
        openEditingMode={this.openEditingMode}
      />
    );
  }
}
