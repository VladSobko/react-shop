import React, { Component } from "react";

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false };
    this.editProduct = this.editProduct.bind(this);
    this.editProductSubmit = this.editProductSubmit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  deleteProduct() {
    const { id } = this.props.product;
    this.props.deleteProduct(id);
  }
  editProduct() {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit,
    }));
  }
  editProductSubmit() {
    this.setState((prevState, props) => ({
      isEdit: !prevState.isEdit,
    }));
    this.props.editProductSubmit(
      this.props.product.id,
      this.titleInput.value,
      this.descriptionInput.value,
      this.priceInput.value,
      this.imageInput.value
    );
  }
  render() {
    const { title, description, price, image } = this.props.product;
    return this.state.isEdit === true ? (
      <tr className="bg-warning" key={this.props.index}>
        <td>
          <input
            ref={(titleInput) => (this.titleInput = titleInput)}
            defaultValue={title}
          />
        </td>
        <td>
          <input
            defaultValue={description}
            ref={(descriptionInput) =>
              (this.descriptionInput = descriptionInput)
            }
          />
        </td>
        <td>
          <input
            ref={(priceInput) => (this.priceInput = priceInput)}
            defaultValue={price}
          />
        </td>
        <td>
          <input
            ref={(imageInput) => (this.imageInput = imageInput)}
            defaultValue={image}
          />
        </td>
        <td>
          <button className="btn btn-primary" onClick={this.editProductSubmit}>
            Save
          </button>
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ) : (
      <tr key={this.props.index}>
        <td>{title}</td>
        <td>{description}</td>
        <td>{price}</td>
        <td>{image}</td>
        <td>
          <button className="btn btn-warning" onClick={this.editProduct}>
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={this.deleteProduct}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
