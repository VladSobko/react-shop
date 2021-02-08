import React, { Component } from "react";

const ProductItemView = ({ index, title, description, price, image, openEditingMode, deleteProduct }) => {
  return (
    <tr key={index}>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{image}</td>
      <td>
        <button className="btn btn-warning" onClick={openEditingMode}>
          Edit
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={deleteProduct}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false };
    this.openEditingMode = this.openEditingMode.bind(this);
    this.editProductSubmit = this.editProductSubmit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
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
      this.titleInput.value,
      this.descriptionInput.value,
      this.priceInput.value,
      this.imageInput.value
    );
  }

  render() {
    const { index, title, description, price, image } = this.props.product;
    const { isEdit } = this.state;
    return isEdit ? (
      <tr className="bg-warning" key={index}>
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
