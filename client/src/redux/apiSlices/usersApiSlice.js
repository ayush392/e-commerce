import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: { ...user },
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: { ...user },
      }),
    }),
    getUserProfile: builder.query({
      query: () => "/users/profile",
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useGetUserProfileQuery } =
  usersApiSlice;
