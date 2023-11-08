import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("thapaCart");
  // console.log(localCartData)
  if (localCartData === []){
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
    // cart: [],
   cart: getLocalCartData() ||[],
  total_item: "",
  total_price: "",
  shipping_fee: 3000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // increment and decrement the product

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  // to remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // to add the data in localStorage
  
  const key = 'thapaCart'; // Replace 'myData' with the key you want to use in localStorage

let dataList = localStorage.getItem(key);

if (!dataList || !Array.isArray(JSON.parse(dataList))) {
  dataList = JSON.stringify([]); // Convert the empty array to a JSON string
  localStorage.setItem(key, dataList); // Set the default empty array in localStorage
}

  useEffect(() => {
    
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

  localStorage.setItem("thapaCart", JSON.stringify(state.cart));
   
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
