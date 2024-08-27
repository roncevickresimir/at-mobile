import { ILocation } from '~interfaces';

import { IReward } from './IReward';

export interface IStation {
  id: string;
  name: string;
  description: string;
  // categories: number[];
  userId: string;
  location: ILocation;
  published: boolean;
  image: string;
  complete?: string;
  // reward?: IReward[];
}
