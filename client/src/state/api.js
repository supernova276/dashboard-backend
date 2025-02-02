import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { selectCurrentUser } from 'state/user';
import { useSelector } from 'react-redux';


// const accessToken = useSelector(selectCurrentUser);

export const api = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
          // Access the state directly instead of using useSelector
          const token = getState()?.user.user?.accesstoken;
          if (token) {
            headers.set('accesstoken', token); // Use lowercase to match middleware
          } else {
            console.error('No token found in state');
          }
          
          return headers;
        },
      }),
      reducerPath: "adminApi",
      tagTypes: ["User", "Products", "Customers", "Transactions", "Sales", "Admins", "Dashboard"],
      endpoints: (build) => ({
        signupUser: build.mutation({  
            query: (data) => ({       
                url: '/auth/signup/',
                method: 'POST',       
                body: data           
            }),
            invalidatesTags: ["User"]
        }),
        loginUser:build.mutation({  // Changed from query to mutation
            query: (data) => ({       // Added data parameter
                url: '/auth/login/',
                method: 'POST',       // Added POST method
                body: data           // Added request body
            }),
            invalidatesTags: ["User"]
        }),
        getProducts: build.query({
            query:()=>({
                url:'/client/get-product/',
                method:'GET',
            }),
            invalidatesTags:["Products"]
        }),

        getCustomers:build.query({
            query:()=>({
                url:'/client/get-customers',
                method:'GET'
            }),
            invalidatesTags:["Customers"]
        }),

        
        getTransactions:build.query({
            query:({page,pageSize,sort,search})=>({
                url:'/client/get-transactions',
                method:'GET',
                params:{page,pageSize,sort,search}
            }),
            invalidatesTags:["Transactions"]
        }),
        getSales: build.query({
            query:()=>({
                url:'/sales/get-overall-stats/',
                method:'GET'
            }),
            invalidatesTags:["Sales"]
        }),

        getAdmins: build.query({
            query:()=>({
                url:'/management/get-admins/',
                method:'GET'
            }),
            invalidatesTags:["Admins"]
        }),

        getDashboard: build.query({
            query:()=>({
                url:'/auth/get-dashboard',
                method:'GET'
            }),
            invalidatesTags:["Dashboard"]
        }),
    }),




})
export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetDashboardQuery
}=api 