import IReward from "./IReward";

export interface ILocation {
  lat: number;
  lng: number;
}
export default interface IStation {
  id: string;
  name: string;
  description: string;
  categories: number[];
  userId: string;
  location: ILocation;
  published: boolean;
  image: string;
  complete?: string;
  reward?: IReward[];
}
