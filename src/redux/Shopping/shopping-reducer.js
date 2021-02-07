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
  products:
    // JSON.parse(localStorage.getItem("products")).products ||
    productsInitialState,
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Get Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      let stateCopyOnAddToCart = {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
      localStorage.setItem("products", JSON.stringify(stateCopyOnAddToCart));
      return stateCopyOnAddToCart;

    case actionTypes.REMOVE_FROM_CART:
      let stateCopyOnRemoveFromCart = {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
      localStorage.setItem(
        "products",
        JSON.stringify(stateCopyOnRemoveFromCart)
      );
      localStorage.setItem(
        "products",
        JSON.stringify(stateCopyOnRemoveFromCart)
      );
      return stateCopyOnRemoveFromCart;

    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    case "ADD_PRODUCT":
      let stateCopyOnAdd = {
        ...state,
        products: state.products.concat(action.payload),
      };
      localStorage.setItem("products", JSON.stringify(stateCopyOnAdd));
      return stateCopyOnAdd;

    case "DELETE_PRODUCT":
      let stateCopyOnDel = {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.payload.id
        ),
      };
      localStorage.setItem("products", JSON.stringify(stateCopyOnDel));
      return stateCopyOnDel;

    case "UPDATE_PRODUCT":
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

    default:
      return state;
  }
};

export default shopReducer;
