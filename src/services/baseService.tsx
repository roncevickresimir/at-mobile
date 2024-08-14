import { AT_API_URI } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



import { RootState } from '.STORE';

export const baseService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: AT_API_URI,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});