const { baseApi } = require("./baseApi");

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (params) => ({
        url: "/services",
        method: "GET",
        params,
      }),
      providesTags: ["services"],
    }),
    getServiceDetails: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    createService: builder.mutation({
      query: (serviceData) => ({
        url: `/services`,
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ data, id }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceDetailsQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
