import {configureStore} from "@reduxjs/toolkit"
import AuthReducers from "./features/Slice.js"

export const store = configureStore({
    reducer : {
        Auth : AuthReducers
    }
});

