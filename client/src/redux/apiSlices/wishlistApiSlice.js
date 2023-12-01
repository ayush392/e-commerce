import { apiSlice } from "../api/apiSlice";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  tagtypes: ["Wishlist"],
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (product) => ({
        url: "/users/wishlist/add",
        method: "POST",
        body: { ...product },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    getWishlistItems: builder.query({
      query: () => "/users/wishlist",
      providesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (product) => ({
        url: "/users/wishlist/remove",
        method: "DELETE",
        body: { ...product },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    clearWishlist: builder.mutation({
      query: () => ({
        url: "/users/wishlist/clear",
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistItemsQuery,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistApiSlice;
