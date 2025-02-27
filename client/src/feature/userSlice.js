import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginUser: (state, action) => {
            const user = action.payload.data;
            // Set the user state
            state.user = user;
            // Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(user));
        },
        logoutUser: (state) => {
            // Clear the user state
            state.user = null;
            // Remove user data from localStorage
            localStorage.removeItem('user');
            // Display a success message
            toast.success("Logout Berhasil");
        },
        registerUser : (state, action) =>{
            const user = action.payload.data;
            state.user = user
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
})

export const { loginUser, logoutUser, registerUser } = userSlice.actions;

export default userSlice.reducer;
