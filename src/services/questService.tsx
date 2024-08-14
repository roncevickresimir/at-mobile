import { t } from 'i18next';

import { ILocation, IQuest } from '~interfaces';
import { HttpMethods } from '~lookups';

import { baseService } from './baseService';

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
            image:
              'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg', //quest.image,
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
      transformResponse: (quest: IQuestResponse) => {
        return {
          id: quest.id,
          name: quest.title,
          description: quest.description,
          categories: quest.categoryIds,
          location: { lat: quest.latitude, lng: quest.longitude },
          userId: quest.userId,
          published: !quest.disabled,
          image: apiUrl + 'images/' + quest.image,
          stations: quest.QuestStationRelations.map((station: any) => {
            const x = station.Station;
            return {
              id: x.id,
              name: x.title,
              description: x.description,
              categories: x.categoryIds,
              userId: x.userId,
              location: { lat: quest.latitude, lng: quest.longitude },
              published: !x.disabled,
              complete: x.EndUserStations.length ? true : false,
              image: '',
              reward: x.RewardTypes.map((reward: any) => {
                return {
                  id: reward.id,
                  name: reward.name,
                  description: reward.description,
                  image: reward.image ? apiUrl + 'images/' + reward.image : reward.image,
                };
              }),
            };
          }),
        };
      },
    }),
    getCompletedQuests: builder.query<IQuest[], string>({
      query: (userId) => ({
        url: `${URL}/completed/${userId}`,
        method: HttpMethods.GET,
      }),
      transformResponse: (response: any) => {
        const r: any = [];

        const quests: any = response.forEach((bs: any) => {
          const questsArray: any = bs?.Station?.QuestStationRelations?.forEach((quest: any) => {
            const x = quest.Quest;
            r.push({
              id: x.id,
              name: x.title,
              description: x.description,
              categories: x.categoryIds,
              stations: x.QuestStationRelations,
              location: { lat: x.latitude, lng: x.longitude },
              userId: x.userId,
              published: !x.disabled,
              image: apiUrl + 'images/' + x.image,
            });
          });
        });
        return r;
      },
    }),
  }),
});

export const { useLazyGetQuestsQuery, useLazyGetQuestByIdQuery, useLazyGetCompletedQuestsQuery } = questService;
