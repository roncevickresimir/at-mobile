import { apiUrl, baseService } from "./baseService";
import { HttpMethods } from "../app/lookups/httpMethods";
import IQuest from "../app/interfaces/IQuest";

const URL = "category";

export interface ICategory {
  name: string;
  id: string;
}

interface ICategoryResponse {}

export const categoryService = baseService.injectEndpoints({
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
