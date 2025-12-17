import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("Authorization", token);
    }
    const signUpToken = localStorage.getItem("signupToken");
    if (signUpToken) {
      headers.set("token", signUpToken);
    }
    const guestToken = sessionStorage.getItem("guestToken");
    if (guestToken) {
      headers.set("token", guestToken);
    }
    const forgetPasswordToken = localStorage.getItem("forgetPasswordToken");
    if (forgetPasswordToken) {
      headers.set("Authorization", forgetPasswordToken);
    }

    return headers;
  },
});
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const token = api.getState().auth.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        // credentials: 'include',
      },
    );

    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = api.getState().auth.user;

      api.dispatch(setUser({ user, token: data.data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["auth", "settings", "dashboard", "stories", "services", "gallery"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
