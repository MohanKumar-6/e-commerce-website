import { loginStart, loginSuccess, loginFailure } from "./UserSlice"
import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from "./productRedux"
import { userRequest, publicRequest } from "../requestMethods"

const Login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("auth/login", user);
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data))
    } catch (err) {
        dispatch(getProductFailure())
    }
}

export const deleteProducts = (dispatch, id) => {
    dispatch(deleteProductStart())
    try {
        // const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id))
    } catch (err) {
        dispatch(deleteProductFailure())
    }
}

export const updateProducts = (dispatch, id, product) => {
    dispatch(updateProductStart())
    try {
        // const res = await userRequest.delete(`/products/${id}`);
        dispatch(updateProductSuccess({id, product}))
    } catch (err) {
        dispatch(updateProductFailure())
    }
}

export const addProducts = async (dispatch, product) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post(`/products/`,{product});
        dispatch(addProductSuccess(res.data))
    } catch (err) {
        dispatch(addProductFailure())
    }
}

export default Login
