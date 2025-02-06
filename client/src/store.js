import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./feature/userSlice";
import cartReducer from "./feature/cartSlice";

export const store = configureStore({
    reducer:{
        userState : userReducer,
        cartState : cartReducer 
    }
})