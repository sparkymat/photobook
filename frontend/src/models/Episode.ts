// eslint-disable-next-line import/no-cycle
import { EpisodeGuestArtist } from './EpisodeGuestArtist';

export class Episode {
  public id: string;

  public number: number;

  public title: string;

  public season_id: string;

  public episode_guest_artists: EpisodeGuestArtist[];

  constructor(json: any) {
    if (!json) {
      return;
    }

    this.id = json.id;
    this.number = json.number;
    this.title = json.title;
    this.season_id = json.season_id;

    if (json.episode_guest_artists) {
      this.episode_guest_artists = json.episode_guest_artists.map(
        s => new EpisodeGuestArtist(s),
      );
    } else {
      this.episode_guest_artists = [];
    }
  }
}
