import { apiSlice } from "../api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;
