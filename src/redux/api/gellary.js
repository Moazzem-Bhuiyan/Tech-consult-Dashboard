const { baseApi } = require("./baseApi");

const GalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: (params) => ({
        url: "/service-photos",
        method: "GET",
        params,
      }),
      providesTags: ["gallery"],
    }),
    getGalleryDetails: builder.query({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "GET",
      }),
      providesTags: ["gallery"],
    }),
    createGalleryItem: builder.mutation({
      query: (galleryData) => ({
        url: `/service-photos`,
        method: "POST",
        body: galleryData,
      }),
      invalidatesTags: ["gallery"],
    }),
    updateGalleryItem: builder.mutation({
      query: ({ id, galleryData }) => ({
        url: `/service-photos/${id}`,
        method: "PUT",
        body: galleryData,
      }),
      invalidatesTags: ["gallery"],
    }),
    deleteGalleryItem: builder.mutation({
      query: (id) => ({
        url: `/service-photos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useGetGalleryDetailsQuery,
  useCreateGalleryItemMutation,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} = GalleryApi;
