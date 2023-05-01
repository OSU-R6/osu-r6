import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'todos',
    initialState: false,
    reducers: {
        login(state, _) {
            return true
        },
        logout(state, _) {
            return false
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer