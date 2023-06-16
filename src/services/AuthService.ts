import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { LocalStorage } from "utils/localStorage";
import { logout } from "store/auth";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_API}`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = LocalStorage.getAccessToken();
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = LocalStorage.getRefreshToken();
    const refreshResult = await fetch(
      `${import.meta.env.VITE_SERVER_API}/auth/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    const response = await refreshResult.json();

    if (response.data) {
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      console.log("refreshToken", refreshToken);

      LocalStorage.setAccessToken(accessToken);
      LocalStorage.setRefreshToken(refreshToken);

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
