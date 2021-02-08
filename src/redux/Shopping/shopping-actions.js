import * as actionTypes from "./shopping-types";

export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const adjustQty = (itemID, value) => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export function addProduct(product) {
  return {
    type: actionTypes.ADD_PRODUCT,
    payload: product,
  };
}

export function deleteProduct(itemID) {
  return {
    type: actionTypes.DELETE_PRODUCT,
    payload: {
      id: itemID,
    },
  };
}

export function updateProduct(product) {
  return {
    type: actionTypes.UPDATE_PRODUCT,
    payload: product,
  };
}
