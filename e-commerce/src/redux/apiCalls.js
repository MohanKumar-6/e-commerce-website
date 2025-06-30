import { loginStart, loginSuccess, loginFailure } from "./userSlice"
import { productFetchStart, productFetchSuccess, productFetchFailure } from "./productSlice"
import { publicRequest } from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())    
    }
}

export const productFetch = async (dispatch) => {
    dispatch(productFetchStart());
    try {
        const res = await publicRequest.get("products");
        console.log(res.data);
        dispatch(productFetchSuccess(res.data));
    } catch (err) {
        dispatch(productFetchFailure());
    }
}