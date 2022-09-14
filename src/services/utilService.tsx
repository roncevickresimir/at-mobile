import { baseService } from './baseService';
import { HttpMethods } from '../app/lookups/httpMethods';

const URL = '/util';
export const utilService = baseService.injectEndpoints({
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
