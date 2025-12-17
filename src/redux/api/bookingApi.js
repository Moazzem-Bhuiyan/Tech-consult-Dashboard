const { baseApi } = require("./baseApi");

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (params) => ({
        url: "/service-bookings",
        method: "GET",
        params,
      }),
      providesTags: ["bookings"],
    }),
    getBookingDetails: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["bookings"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/service-bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings"],
    }),
  }),
});
export const {
  useGetBookingsQuery,
  useGetBookingDetailsQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
} = bookingApi;
