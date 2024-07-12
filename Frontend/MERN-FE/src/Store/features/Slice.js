import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userdata: null
}

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        AuthLogin: (state, action) => {
            state.status = true,
                state.userdata = action.payload.userdata
        }
    }
});

export const { AuthLogin } = AuthSlice.actions
export default AuthSlice.reducer

/* username: "",
    email: "",
    fullname: "",
    avatar: {
        url: "",
        public_id: ""
    },
    coverImage: {
        url: "",
        public_id: ""
    },
    refreshToken: ""
*/