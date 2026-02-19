import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const COURSE_PURCHASE_API = "VITE_API_URL/api/v1/purchase";

export const purchaseApi = createApi({
    reducerPath:"purchaseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_PURCHASE_API,
        credentials:"include"
    }),
    endpoints: (builder) => ({
        // Razorpay order creation
        createOrder: builder.mutation({
            query: (courseId) => ({
                url: "/order/create",
                method:"POST",
                body: {courseId}
            })
        }),
        // Course details + purchased Status
        getCourseDetailsWithStatus: builder.query({
            query: (courseId) => `/course/${courseId}/detail-with-status`,
        }),
        // All purchased course
        getPurchasedCourse: builder.query({
            query: ()=> `/`,
        }),
        // payment verification
        verifyPayment: builder.mutation({
            query: (paymentResponse) => ({
                url: "/order/verify",
                method:"POST",
                body: paymentResponse,
                credentials: "include"
            })
        }),

    })
})

export const {useCreateOrderMutation, useGetCourseDetailsWithStatusQuery, useGetPurchasedCourseQuery, useVerifyPaymentMutation} = purchaseApi;