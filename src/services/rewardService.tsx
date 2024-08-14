import { HttpMethods } from "../app/lookups/httpMethods";
import { apiUrl, baseService } from "./baseService";


const URL = "reward";

export const rewardService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRewardsByUserId: builder.query<any, string>({
      query: (userId) => ({
        url: `${URL}/user/${userId}`,
        method: HttpMethods.GET,
      }),

      transformResponse: (response: any) => {
        return response.map((r: any) => {
          const reward = r.RewardType;
          return {
            id: reward.id,
            name: reward.name,
            description: reward.description,
            image: reward.image ? apiUrl + 'images/' + reward.image : reward.image,
          };
        });
      },
    }),
  }),
});

export const { useLazyGetRewardsByUserIdQuery } = rewardService;