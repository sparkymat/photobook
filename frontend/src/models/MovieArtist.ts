// eslint-disable-next-line import/no-cycle
import { Artist } from './Artist';
// eslint-disable-next-line import/no-cycle
import { Movie } from './Movie';

export class MovieArtist {
  public id: string;

  public movie_id: string;

  public artist_id: string;

  public artist?: Artist;

  public movie?: Movie;

  public credit_order: number;

  public character: string;

  constructor(json: any) {
    this.id = json.id;
    this.artist_id = json.artist_id;
    this.movie_id = json.movie_id;
    this.credit_order = json.credit_order;
    this.character = json.character;

    if (json.artist) {
      this.artist = new Artist(json.artist);
    }

    if (json.movie) {
      this.movie = new Movie(json.movie);
    }
  }
}
