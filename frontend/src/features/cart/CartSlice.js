import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState={
    isLoading:true,
    cartItem:[],
    amount:3,
    total:0,
    status:null
}


const url='http://localhost:4000/v1/products';

export const productFetch=createAsyncThunk(
    'products/productFetch',async(name,thunkApi)=>{
        try{
            const res=await axios(url);
            return res?.data
        }catch(error){
            return thunkApi.rejectWithValue('Something went wrong')
        }
    }
)


const cartSlice=createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:{
        [productFetch.pending]:(state,action)=>{
           state.status='pending'
        },
        [productFetch.success]:(state,action)=>{
            state.status='success'
         },
         [productFetch.rejected]:(state,action)=>{
            state.status='rejected'
         },
    }
  
})



export default cartSlice.reducer