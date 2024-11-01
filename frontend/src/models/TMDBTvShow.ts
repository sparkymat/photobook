import { ISO639_1 } from './Language';

export class TMDBTvShow {
  public id: string;

  public title: string;

  public genres: string[];

  public poster_path: string;

  public overview: string;

  public original_language: string;

  public vote_average: number;

  constructor(json: any) {
    this.id = json.id;
    this.title = json.title;
    this.genres = json.genres;
    this.poster_path = json.poster_path;
    this.overview = json.overview;
    this.original_language = ISO639_1[json.original_language];
    this.vote_average = json.vote_average;
  }
}
