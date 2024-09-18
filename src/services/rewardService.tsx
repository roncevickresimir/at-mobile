import { HttpMethods } from '../app/lookups/httpMethods';
import { baseService } from './baseService';
import { Config } from '.CONFIG';

const URL = 'reward';

export const rewardService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRewardsByUserId: builder.query<any, string>({
      query: (userId) => ({
        url: `${URL}/user/${userId}`,
        method: HttpMethods.GET,
      }),

      transformResponse: (response: any) => {
        console.log(response);
        return response.map((r: any) => {
          const reward = r.RewardType;
          return {
            id: reward.id,
            name: reward.name,
            description: reward.description,
            image: `${Config.AT_IMAGE_URI}/${URL}/${reward.image}`,
          };
        });
      },
    }),
  }),
});

export const { useLazyGetRewardsByUserIdQuery } = rewardService;
