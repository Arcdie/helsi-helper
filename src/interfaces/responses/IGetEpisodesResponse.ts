import { IEpisode } from '../IEpisode';

export interface IGetEpisodesResponse {
  data: IEpisode[],
  meta: {
    hasNext: boolean;
  }
}
