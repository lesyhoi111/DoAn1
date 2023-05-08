import { configureStore } from "@reduxjs/toolkit";
import cartReducer  from "./CartSlice";
import addressReducer  from "./AddressSlice";

export default configureStore({
  reducer: {
    cart: cartReducer ,
    address: addressReducer,
  },
});
