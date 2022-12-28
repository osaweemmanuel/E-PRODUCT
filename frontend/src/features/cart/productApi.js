import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const productApi=createApi({
    reducerPath:"products",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:4000/v1"}),
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:()=>"products",
        })
    })
})

export const {useGetAllProductsQuery}=productApi