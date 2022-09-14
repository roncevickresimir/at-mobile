export interface ILocation {
  lat: number;
  lng: number;
}
export default interface IQuest {
  id: string;
  name: string;
  description: string;
  categories: number[];
  userId: string;
  location: ILocation;
  stations: number[];
  published: boolean;
  image: string;
}
