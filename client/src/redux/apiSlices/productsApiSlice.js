import { apiSlice } from "../api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (searchParams) => {
        return `/products?${searchParams}`;
      },
    }),

    getSingleProduct: builder.query({
      query: (productId) => `/products/${productId}`,
    }),

    getFilters: builder.query({
      query: (searchParams) => `/products/filters/?${searchParams}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFiltersQuery,
  useGetSingleProductQuery,
} = productsApiSlice;
