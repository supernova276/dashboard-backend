import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import React from 'react'


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User"],
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
    })
})
export const {
    useSignupUserMutation,
    useLoginUserMutation,
}=api 