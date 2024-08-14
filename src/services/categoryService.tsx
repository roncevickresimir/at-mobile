import { HttpMethods } from '~lookups';

import { baseService } from './baseService';

const URL = 'categories';

export interface ICategory {
  id: string;
  abrv: string;
  name: string;
}

interface ICategoryResponse {}

export const categoryService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], null>({
      query: () => ({
        url: `${URL}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
});

export const { useLazyGetCategoriesQuery } = categoryService;
