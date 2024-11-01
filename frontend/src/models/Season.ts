// eslint-disable-next-line import/no-cycle
import { Episode } from './Episode';
// eslint-disable-next-line import/no-cycle
import { SeasonArtist } from './SeasonArtist';

export class Season {
  public id: string;

  public number: number;

  public title: string;

  public episodes: Episode[];

  public season_artists: SeasonArtist[];

  constructor(json: any) {
    if (!json) {
      return;
    }

    this.id = json.id;
    this.number = json.number;
    this.title = json.title;

    if (json.episodes) {
      this.episodes = json.episodes.map(e => new Episode(e));
    } else {
      this.episodes = [];
    }

    if (json.season_artists) {
      this.season_artists = json.season_artists.map(s => new SeasonArtist(s));
    } else {
      this.season_artists = [];
    }
  }
}
