import { ILocation, IQuest } from '~interfaces';
import { HttpMethods } from '~lookups';

import { baseService } from './baseService';
import { Config } from '.CONFIG';

const URL = 'quests';

export interface IGetQuestsPayload {
  page: number;
  rpp: number;
  location: ILocation;
  category?: string;
}

interface IQuestResponse {
  id: string;
  title: string;
  description: string;
  categoryIds: number[];
  userId: string;
  latitude: number;
  longitude: number;
  disabled: boolean;
  image: string;
  QuestStationRelations: any; // ...
}

interface IGetQuestById {
  questId: string;
  userId: string;
}

export const questService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getQuests: builder.query<IQuest[], IGetQuestsPayload>({
      query: (data) => ({
        url:
          `${URL}/closest?` +
          `page=${data.page}` +
          `&rpp=${data.rpp}` +
          `${data.category ? `&category=${data.category}` : ''}` +
          `&lat=${data.location.lat}` +
          `&lng=${data.location.lng}`,
        method: HttpMethods.GET,
      }),
      transformResponse: (response: any) => {
        const quests = response?.map((quest: any) => {
          return {
            id: quest.id,
            name: quest.title,
            description: quest.description,
            categories: quest.Categories,
            stations: quest.Stations,
            location: { lat: quest.latitude, lng: quest.longitude },
            userId: quest.userId,
            published: !quest.disabled,
            image: `${Config.AT_IMAGE_URI}/${URL}/${quest.image}`,
            distance: quest.distance > 99 ? undefined /*t('QUEST_PAGE.FAR_AWAY')*/ : quest.distance,
          };
        });
        return quests;
      },
    }),
    getQuestById: builder.query<IQuest, IGetQuestById>({
      query: (data) => ({
        url: `${URL}/${data.questId}/${data.userId}`,
        method: HttpMethods.GET,
      }),
      transformResponse: (quest: any) => {
        return {
          id: quest.id,
          name: quest.title,
          description: quest.description,
          userId: quest.userId,
          location: { lat: quest.latitude, lng: quest.longitude },
          published: !quest.disabled,
          image: `${Config.AT_IMAGE_URI}/${URL}/${quest.image}`,
          stations: quest.Stations.map((station: any) => {
            return {
              id: station.id,
              name: station.title,
              description: station.description,
              userId: station.userId,
              location: station.location,
              published: !station.disabled,
              complete: !!station.UserStations.length,
              image: `${Config.AT_IMAGE_URI}/${URL}/${quest.image}`,
            };
          }),
          reward: quest.Rewards?.map((reward: any) => {
            return {
              id: reward.id,
              name: reward.name,
              description: reward.description,
              image: `${Config.AT_IMAGE_URI}/${URL}/${quest.image}`,
            };
          }),
        };
      },
    }),
    getUserQuests: builder.query<IQuest[], string>({
      query: (userId) => ({
        url: `${URL}/user/${userId}`,
        method: HttpMethods.GET,
      }),
      transformResponse: (response: any) => {
        const r: any = [];

        console.log(response);

        const quests: any = response.map((quest: any) => {
          return {
            id: quest.id,
            name: quest.title,
            description: quest.description,
            categories: quest.Categories,
            stations: quest.Stations,
            location: { lat: quest.latitude, lng: quest.longitude },
            userId: quest.userId,
            published: !quest.disabled,
            image: `${Config.AT_IMAGE_URI}/${URL}/${quest.image}`,
            distance: quest.distance > 99 ? undefined /*t('QUEST_PAGE.FAR_AWAY')*/ : quest.distance,
          };
        });

        console.log(quests);
        return quests;
      },
    }),
  }),
});

export const { useLazyGetQuestsQuery, useLazyGetQuestByIdQuery, useLazyGetUserQuestsQuery } = questService;
