export interface ILocation {
  lat: number;
  lng: number;
}
export interface IQuest {
  id: string;
  name: string;
  description: string;
  userId: string;
  location: ILocation;
  stations: number[];
  published: boolean;
  image: string;
  distance?: string;
}
