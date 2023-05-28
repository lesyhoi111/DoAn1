import { createSlice } from '@reduxjs/toolkit'
const initialState = []
export const CurentUserSlice = createSlice({
  name: 'CurentUser',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload
    },
    SignOut: (state, action) => {
      return {}
    }

  }
})
export const { addUser, SignOut } = CurentUserSlice.actions
export default CurentUserSlice.reducer