import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  REACT_APP_SCHEMA,
  REACT_APP_HOST,
  REACT_APP_API_PORT,
  REACT_APP_API,
} from "@env";

import Constants from "expo-constants";

const { manifest } = Constants;

import { RootState } from "../store";

const expoHost = manifest.debuggerHost?.split(":").shift();

export const apiUrl = `${REACT_APP_SCHEMA}://${expoHost}:${REACT_APP_API_PORT}/${REACT_APP_API}/`;

export const baseService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${REACT_APP_SCHEMA}://${
      expoHost ? expoHost : "localhost"
    }:${REACT_APP_API_PORT}/${REACT_APP_API}/`, //REACT_APP_HOST
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
