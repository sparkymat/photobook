// eslint-disable-next-line import/no-cycle
import { Artist } from './Artist';
// eslint-disable-next-line import/no-cycle
import { Season } from './Season';

export class SeasonArtist {
  public id: string;

  public season_id: string;

  public artist_id: string;

  public artist?: Artist;

  public season?: Season;

  public credit_order: number;

  public character: string;

  constructor(json: any) {
    this.id = json.id;
    this.artist_id = json.artist_id;
    this.season_id = json.season_id;
    this.credit_order = json.credit_order;
    this.character = json.character;

    if (json.artist) {
      this.artist = new Artist(json.artist);
    }

    if (json.season) {
      this.season = new Season(json.season);
    }
  }
}
