import { IStation } from '~interfaces';



import { HttpMethods } from '../app/lookups/httpMethods';
import { baseService } from './baseService';
import { Config } from '.CONFIG';

const URL = 'stations';

export interface IGetStationPayload {
  id: string;
}

interface IStationResponse {
  id: string;
  title: string;
  description: string;
  categoryIds: number[];
  userId: string;
  latitude: number;
  longitude: number;
  disabled: boolean;
  Images: any;
  RewardTypes: any;
}

export interface ICompleteStationPayload {
  userId: string;
  stationId: string;
  complete: boolean;
}

export const stationService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getStation: builder.query<IStation, IGetStationPayload>({
      query: (data) => ({
        url: `${URL}/${data.id}`,
        method: HttpMethods.GET,
      }),
      transformResponse: (station: any) => {
        return {
          id: station.id,
          name: station.title,
          description: station.description,
          // categories: station.categoryIds,
          userId: station.userId,
          questId: station.questId,
          published: !station.disabled,
          location: { lat: station.latitude, lng: station.longitude },
          image: `${Config.AT_IMAGE_URI}/${URL}/${station.image}`,
          // reward: [],
        };
      },
    }),
    completeStation: builder.query<boolean, ICompleteStationPayload>({
      query: (data) => {
        return {
          url: `${URL}/complete/`,
          method: HttpMethods.POST,
          body: data,
        };
      },
    }),
  }),
});

export const { useLazyGetStationQuery, useLazyCompleteStationQuery } = stationService;