// eslint-disable-next-line import/no-cycle
import { Season } from './Season';

export class TvShow {
  public id: string;

  public title: string;

  public poster_url?: string;

  public info_url: string;

  public seasons: Season[];

  constructor(json: any) {
    this.seasons = [];

    if (!json) {
      return;
    }

    this.id = json.id;
    this.title = json.title;
    this.poster_url = json.poster_url;
    this.info_url = json.info_url;

    if (json.seasons) {
      this.seasons = json.seasons.map(s => new Season(s));
    } else {
      this.seasons = [];
    }
  }
}
