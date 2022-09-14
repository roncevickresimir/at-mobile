import { apiUrl, baseService } from "./baseService";
import { HttpMethods } from "../app/lookups/httpMethods";
import IQuest from "../app/interfaces/IQuest";

const URL = "quest";

export interface IGetQuestsPayload {
  search: string;
  page: number;
  rpp: number;
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

export const userService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    getQuests: builder.query<IQuest[], IGetQuestsPayload>({
      query: (data) => ({
        url: `${URL}/closest/?page=${data.page}&rpp=${data.rpp}${
          data.search && "search=" + data.search
        }`,
        method: HttpMethods.POST,
        body: data,
      }),
      transformResponse: (response: IQuestResponse[]) => {
        const quests: IQuest[] = response.map((quest) => {
          return {
            id: quest.id,
            name: quest.title,
            description: quest.description,
            categories: quest.categoryIds,
            stations: quest.QuestStationRelations,
            location: { lat: quest.latitude, lng: quest.longitude },
            userId: quest.userId,
            published: !quest.disabled,
            image: apiUrl + "images/" + quest.image,
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
          image: apiUrl + "images/" + quest.image,
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
              image: "",
              reward: x.RewardTypes.map((reward: any) => {
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
          const questsArray: any = bs?.Station?.QuestStationRelations?.forEach(
            (quest: any) => {
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
                image: apiUrl + "images/" + x.image,
              });
            }
          );
        });
        return r;
      },
    }),
  }),
});

export const {
  useLazyGetQuestsQuery,
  useLazyGetQuestByIdQuery,
  useLazyGetCompletedQuestsQuery,
} = userService;
