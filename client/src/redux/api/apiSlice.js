import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("eCommerceUser")
      ? JSON.parse(localStorage.getItem("eCommerceUser")).token
      : null;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
