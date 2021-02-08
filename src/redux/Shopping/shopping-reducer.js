import * as actionTypes from "./shopping-types";

const productsInitialState = [
  {
    id: 1,
    title: "This is the COOLEST Cube Ever",
    description:
      "This cube will keep you busy the entire day and it is very fun to play with",
    price: 15.0,
    image:
      "https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    title: "Large Coffee Cup",
    description: "Get a big cup of coffee every morning before the day starts",
    price: 20.0,
    image:
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "Books That CHANGED My Life",
    description:
      "These books will keep you busy all throughout the entire lockdown and give you some great advise from famous people",
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1374&q=80",
  },
];

const INITIAL_STATE = {
  products: productsInitialState,
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  const addToCart = () => {
    // Get Item data from products array
    const item = state.products.find(
      (product) => product.id === action.payload.id
    );
    // Check if Item is in cart already
    const inCart = state.cart.find((item) => item.id === action.payload.id);

    const cartWithExistingItem = state.cart.map((item) =>
      item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
    );
    const cartWithNewItem = [...state.cart, { ...item, qty: 1 }];

    let stateCopyOnAddToCart = {
      ...state,
      cart: inCart ? cartWithExistingItem : cartWithNewItem,
    };
    localStorage.setItem("products", JSON.stringify(stateCopyOnAddToCart));
    return stateCopyOnAddToCart;
  };

  const removeFromCart = () => {
    let stateCopyOnRemoveFromCart = {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
    localStorage.setItem("products", JSON.stringify(stateCopyOnRemoveFromCart));
    return stateCopyOnRemoveFromCart;
  };

  const adjustItemQty = () => {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: +action.payload.qty }
          : item
      ),
    };
  };

  const loadCurrentItem = () => {
    return {
      ...state,
      currentItem: action.payload,
    };
  };

  const addProduct = () => {
    let stateCopyOnAdd = {
      ...state,
      products: state.products.concat(action.payload),
    };
    localStorage.setItem("products", JSON.stringify(stateCopyOnAdd));
    return stateCopyOnAdd;
  };

  const deleteProduct = () => {
    let stateCopyOnDel = {
      ...state,
      products: state.products.filter((item) => item.id !== action.payload.id),
    };
    localStorage.setItem("products", JSON.stringify(stateCopyOnDel));
    return stateCopyOnDel;
  };

  const updateProduct = () => {
    let stateCopyOnEdit = {
      ...state,
      products: state.products.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              title: action.payload.title,
              description: action.payload.description,
              price: action.payload.price,
              image: action.payload.image,
            }
          : item
      ),
    };
    localStorage.setItem("products", JSON.stringify(stateCopyOnEdit));
    return stateCopyOnEdit;
  };

  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addToCart();

    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart();

    case actionTypes.ADJUST_ITEM_QTY:
      return adjustItemQty();

    case actionTypes.LOAD_CURRENT_ITEM:
      return loadCurrentItem();

    case actionTypes.ADD_PRODUCT:
      return addProduct();

    case actionTypes.DELETE_PRODUCT:
      return deleteProduct();

    case actionTypes.UPDATE_PRODUCT:
      return updateProduct();

    default:
      return state;
  }
};

export default shopReducer;
