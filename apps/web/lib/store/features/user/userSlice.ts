import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store' 

// Define a type for the slice state
export interface userState {
  name: string
  email: string
  userType: 'doctor' | 'patient'
  id: string
}

const initialState: userState = {
    name: '',
    email: '',
    userType: 'patient',
    id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setuser: (state, action: PayloadAction<userState>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.userType = action.payload.userType
      state.id = action.payload.id
    }
    }
})

export const { setuser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer