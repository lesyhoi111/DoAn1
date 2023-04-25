import { createSlice, nanoid } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addCart: (state, action) => {
      const newCart = {
        id: nanoid(),
        idCart: action.payload.idCart,
        name: action.payload.name,
        image: action.payload.image,
        percent: action.payload.percent,
        sale: action.payload.sale,
        status: action.payload.status,
        price: action.payload.price,
      };
      state.items.push(newCart);
    },
    deleteCart: (state, action) => {
      state.items =state.items.filter((item)=>item.idCart!==action.payload)
    },
  },
});

export const { addCart, deleteCart } = CartSlice.actions;

export default CartSlice.reducer;
