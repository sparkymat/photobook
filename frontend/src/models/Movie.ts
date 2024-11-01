// eslint-disable-next-line import/no-cycle
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-cycle
import { Album } from './Album';
// eslint-disable-next-line import/no-cycle
import { MovieArtist } from './MovieArtist';

export function lookupLanguage(code: string) {
  switch (code) {
    case 'ml':
      return 'Malayalam';
    case 'en':
      return 'English';
    case 'hi':
      return 'Hindi';
    case 'ta':
      return 'Tamil';
    case 'ja':
      return 'Japanese';
    case 'ko':
      return 'Korean';
    case 'kn':
      return 'Kannada';
    case 'te':
      return 'Telugu';
    case 'it':
      return 'Italian';
    case 'fr':
      return 'French';
    case 'de':
      return 'German';
    default:
      return 'Unknown';
  }
}

export class Movie {
  public id: string;

  public title: string;

  public album_id?: string;

  public album?: Album;

  public poster_url?: string;

  public info_url: string;

  public movie_artists: MovieArtist[];

  public synopsis: string;

  public release_date?: dayjs.Dayjs;

  public vote?: number;

  public language?: string;

  constructor(json: any) {
    if (!json) {
      return;
    }

    this.id = json.id;
    this.title = json.title;
    this.album_id = json.album_id;
    this.poster_url = json.poster_url;
    this.info_url = json.info_url;
    this.synopsis = json.synopsis;
    this.vote = json.vote;

    if (json.language) {
      this.language = lookupLanguage(json.language);
    }

    if (json.release_date) {
      this.release_date = dayjs.utc(json.release_date);
    }

    if (json.movie_artists) {
      this.movie_artists = json.movie_artists
        .map(ma => new MovieArtist(ma))
        .sort(
          (a: MovieArtist, b: MovieArtist) => a.credit_order - b.credit_order,
        );
    } else {
      this.movie_artists = [];
    }
  }
}
