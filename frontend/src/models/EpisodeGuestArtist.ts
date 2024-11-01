// eslint-disable-next-line import/no-cycle
import { Artist } from './Artist';
import { Episode } from './Episode';

export class EpisodeGuestArtist {
  public id: string;

  public episode_id: string;

  public artist_id: string;

  public artist?: Artist;

  public episode?: Episode;

  public credit_order: number;

  public character: string;

  constructor(json: any) {
    this.id = json.id;
    this.artist_id = json.artist_id;
    this.episode_id = json.episode_id;
    this.credit_order = json.credit_order;
    this.character = json.character;

    if (json.artist) {
      this.artist = new Artist(json.artist);
    }

    if (json.episode) {
      this.episode = new Episode(json.episode);
    }
  }
}
