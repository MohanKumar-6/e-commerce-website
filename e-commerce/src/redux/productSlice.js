import {createSlice} from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: "product",
    initialState: {
        products : [],
        isFetching : false,
        error : false  
    },
    reducers:{
        productFetchStart:(state)=>{
            state.isFetching = true
        },
        productFetchSuccess:(state, action)=>{
            state.isFetching = false
            state.products = action.payload
        },
        productFetchFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
    }
})

export const {productFetchStart, productFetchSuccess, productFetchFailure} = productSlice.actions
export default productSlice.reducer;