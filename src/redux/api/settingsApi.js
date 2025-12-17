import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTermsAndPrivacy: build.query({
      query: () => ({
        url: "/contents",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    updateTermsAndPrivacy: build.mutation({
      query: (data) => ({
        url: "/contents",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const { useGetTermsAndPrivacyQuery, useUpdateTermsAndPrivacyMutation } =
  settingsApi;
