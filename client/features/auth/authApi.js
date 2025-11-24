import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'Post',
            }),
        }),
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET',
            }),
        }),
    })
})


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshMutation,
    useGetProfileQuery,
} = authApiSlice;