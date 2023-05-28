import { configureStore } from "@reduxjs/toolkit";
import cartReducer  from "./CartSlice";
import addressReducer  from "./AddressSlice";
import CurentUserReducer from "./CurentUserSlice"
export default configureStore({
  reducer: {
    cart: cartReducer ,
    address: addressReducer,
    CurentUser: CurentUserReducer, 
  },
});
