import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../redux/Shopping/shopping-actions";

import ProductList from "./ProductList";

const AdminPage = ({
  productList,
  addProduct,
  deleteProduct,
  updateProduct,
}) => {
  const addNewProduct = () => {
    addProduct({
      id:
        Math.max(
          ...productList.map(function(o) {
            return o.id;
          })
        ) + 1,
      title: "",
      description: "",
      price: 1,
      image: "",
    });
  };

  const deleteProductF = (id) => {
    deleteProduct(id);
  };

  const editProductSubmit = (id, title, description, price, image) => {
    updateProduct({
      id: id,
      title: title,
      description: description,
      price: price,
      image: image,
    });
  };
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">Product Registry</div>
            <div className="card-body">
              <table className="table table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image URI</th>
                    <th>Edit/Save</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <ProductList
                  productList={productList}
                  deleteProduct={deleteProductF}
                  editProductSubmit={editProductSubmit}
                />
              </table>
              <button
                className="btn btn-dark pull-left"
                onClick={() => addNewProduct()}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productList: state.shop.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addProduct: addProduct,
      deleteProduct: deleteProduct,
      updateProduct: updateProduct,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
