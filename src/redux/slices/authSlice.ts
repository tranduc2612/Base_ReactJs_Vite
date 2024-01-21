import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUserInfo{
    isLogin: boolean,
    logging: boolean,
    infoData?: IUser
}

export interface ILoginPayload{
    username?: string,
    password?: string
}

const initialUser: IUserInfo = {
    isLogin: false,
    logging: false,
    infoData: {
        id: undefined,
        username: undefined,
        email: undefined,
        gender: undefined,
        firstName: undefined,
        lastName: undefined,
        image: undefined,
        token: undefined,
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialUser,
    reducers: {
        login(state,action: PayloadAction<ILoginPayload>){
            state.logging = true
        },
        loginSucces(state, action: PayloadAction<IUser>){
            state.isLogin = true
            state.infoData = action.payload
        },
        loginFailed(state, action: PayloadAction<IUser>){
            state.isLogin = false
        },
        logout(state){
            state.infoData = undefined,
            state.isLogin = false
        }

    
    }
})

export const {login,logout,loginSucces,loginFailed} = authSlice.actions

export const isLogin = (state:RootState) => state.auth.isLogin
export const logging = (state:RootState) => state.auth.logging 
export const inforUser = (state:RootState) => state.auth.infoData 


const authReducer = authSlice.reducer;
export default authReducer;