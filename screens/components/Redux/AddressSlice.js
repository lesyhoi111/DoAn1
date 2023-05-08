import { createSlice, nanoid } from "@reduxjs/toolkit";

const addres = [
    {
        id:'001',
        name: 'lê sỹ hội',
        address: 'quảng nam',
        street: 'ql 1a',
        numphone: '01 213 21 32',
        isdefault: true
    },
    {
        id:'002',
        name: 'Nguyễn văn B',
        address: 'quảng nam',
        street: 'ql 1a',
        numphone: '01 213 21 32',
        isdefault: false
    },
    {
        id:'003',
        name: 'lê sỹ ',
        address: 'tp.hcm',
        street: 'ql 1a',
        numphone: '01 288 21 84',
        isdefault: false
    },]
    const def=addres.find((item,index)=>{return item.isdefault==true})

export const AddressSlice = createSlice({
    
  name: "address",
  initialState: {
    id: def.id,
    name: def.name,
    address: def.address,
    street: def.street,
    numphone: def.numphone,
  },
  reducers: {
    updateAdd: (state, action) => {
      const newCart = {
        id: action.payload.id,
        name: action.payload.name,
        address: action.payload.address,
        street: action.payload.street,
        numphone: action.payload.numphone,
      };
    //   state=newCart;
     
      state={...newCart}
      return state
    }
  },
});

export const { updateAdd } = AddressSlice.actions;

export default AddressSlice.reducer;
