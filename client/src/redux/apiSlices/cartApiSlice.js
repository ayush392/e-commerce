import { apiSlice } from "../api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (product) => ({
        url: "/users/cart/add",
        method: "POST",
        body: { ...product },
      }),
      invalidatesTags: ["Cart"],
    }),

    getCartItems: builder.query({
      query: () => "/users/cart",
      providesTags: ["Cart"],
    }),

    updateCart: builder.mutation({
      query: (product) => ({
        url: "users/cart/update",
        method: "PUT",
        body: { ...product },
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteFromCart: builder.mutation({
      query: (product) => ({
        url: "/users/cart/remove",
        method: "DELETE",
        body: { ...product },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/users/cart/clear",
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartItemsQuery,
  useUpdateCartMutation,
  useDeleteFromCartMutation,
  useClearCartMutation,
} = cartApiSlice;
