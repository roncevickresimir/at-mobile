import { HttpMethods } from '../app/lookups/httpMethods';
import { baseService } from './baseService';


const URL = '/util';
export const utilService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getServerVersion: builder.query<string, void>({
      query: () => ({
        url: `${URL}/get-server-version`,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

export const {
    useLazyGetServerVersionQuery,
} = utilService;