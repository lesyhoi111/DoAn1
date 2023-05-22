import { createSlice, nanoid } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    voucher:{
      id: '000',
      name: '',
      num: 0,
      dateStart: '',
      dateEnd: '',
      type: '',
      priceOf: 0,
      condition: 0,
      remain: 0,
    },
  },
  reducers: {
    addCart: (state, action) => {
      // const newCart = {
      //   id: nanoid(),
      //   idCart: action.payload.idCart,
      //   name: action.payload.name,
      //   image: action.payload.image,
      //   percent: action.payload.percent,
      //   sale: action.payload.sale,
      //   status: action.payload.status,
      //   price: action.payload.price,
      //   num: action.payload.num,
      // };
      // state.items.push(newCart);
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: nanoid(),
            // idCart: action.payload.idCart,
            // name: action.payload.name,
            // image: action.payload.image,
            // percent: action.payload.percent,
            // sale: action.payload.sale,
            // status: action.payload.status,
            // price: action.payload.price,
            // num: action.payload.num,
            product:action.payload.item,
            num: action.payload.num,
          },
        ],
      };
    },
    deleteCart: (state, action) => {
      // state.items =state.items.filter((item)=>item.idCart!==action.payload)
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    },
    addVoucher: (state, action) => {
      const newVoucher = {
        id: action.payload.id,
        name: action.payload.name,
        num: action.payload.num,
        dateStart: action.payload.dateStart,
        dateEnd: action.payload.dateEnd,
        type: action.payload.type,
        priceOf: action.payload.priceOf,
        condition: action.payload.condition,
        remain: action.payload.remain,
      };
      // id: '002',
      // name: 'Miễn phí vận chuyển',
      // num: 20,
      // dateStart: '20/10/2022',
      // dateEnd: '19/7/2023',
      // type: 'freeship',
      // priceOf: 25000,
      // condition: 0,
      // remain: 18,
      return {
        ...state,
        voucher: newVoucher,
      };
    },
  },
});

export const { addCart, deleteCart,addVoucher } = CartSlice.actions;

export default CartSlice.reducer;
