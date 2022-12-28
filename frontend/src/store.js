import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/cart/CartSlice'
import { productFetch } from './features/cart/CartSlice';
import { productApi } from './features/cart/productApi';

export const store=configureStore({
  reducer:{
    cart:cartReducer, 
    [productApi.reducerPath]:productApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware().concat(productApi.middleware);
  }
});

store.dispatch(productFetch())