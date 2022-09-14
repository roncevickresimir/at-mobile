import { apiUrl, baseService } from "./baseService";
import { HttpMethods } from "../app/lookups/httpMethods";
import IStation from "../app/interfaces/IStation";

const URL = "station";

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
  endpoints: (builder) => ({
    getStation: builder.query<IStation, IGetStationPayload>({
      query: (data) => ({
        url: `${URL}/${data.id}`,
        method: HttpMethods.GET,
      }),
      transformResponse: (station: IStationResponse) => {
        return {
          id: station.id,
          name: station.title,
          description: station.description,
          categories: station.categoryIds,
          location: { lat: station.latitude, lng: station.longitude },
          userId: station.userId,
          published: !station.disabled,
          image: apiUrl + "images/" + station.Images[0].fileName,
          reward: station.RewardTypes.map((reward: any) => {
            return {
              id: reward.id,
              name: reward.name,
              description: reward.description,
              image: reward.image
                ? apiUrl + "images/" + reward.image
                : reward.image,
            };
          }),
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

export const { useLazyGetStationQuery, useLazyCompleteStationQuery } =
  stationService;
