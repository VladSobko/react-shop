import React, { useCallback } from "react";

import ProductList from "./ProductList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../redux/Shopping/shopping-actions";

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

// class AdminPage extends Component {
//   constructor(props) {
//     super(props);
//     this.addNewProduct = this.addNewProduct.bind(this);
//     this.deleteProduct = this.deleteProduct.bind(this);
//     this.editProductSubmit = this.editProductSubmit.bind(this);
//   }

//   addNewProduct() {
//     this.props.addProduct({
//       id:
//         Math.max(
//           ...this.props.productList.map(function(o) {
//             return o.id;
//           })
//         ) + 1,
//       title: "",
//       description: "",
//       price: 1,
//       image: "",
//     });
//   }

//   deleteProduct(id) {
//     this.props.deleteProduct(id);
//   }
//   editProductSubmit(id, title, description, price, image) {
//     this.props.updateProduct({
//       id: id,
//       title: title,
//       description: description,
//       price: price,
//       image: image,
//     });
//   }
//   render() {
//     console.log(JSON.parse(localStorage.getItem("products")).products);
//     return (
//       <div className="container-fluid">
//         <div className="row mt-3">
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-header">Product Registry</div>
//               <div className="card-body">
//                 <table className="table table-hover">
//                   <thead className="thead-dark">
//                     <tr>
//                       <th>Title</th>
//                       <th>Description</th>
//                       <th>Price</th>
//                       <th>Image URI</th>
//                       <th>Edit/Save</th>
//                       <th>Delete</th>
//                     </tr>
//                   </thead>
//                   <ProductList
//                     productList={this.props.productList}
//                     deleteProduct={this.deleteProduct}
//                     editProductSubmit={this.editProductSubmit}
//                   />
//                 </table>
//                 <button
//                   className="btn btn-dark pull-left"
//                   onClick={this.addNewProduct}
//                 >
//                   Add New
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

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
// const mapDispatchToProps = dispatch => {
//   return {
//     addProduct: id => dispatch(addProduct(id)),
//     deleteProduct: id => dispatch(deleteProduct(id)),
//     updateProduct: id => dispatch(updateProduct(id)),
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
