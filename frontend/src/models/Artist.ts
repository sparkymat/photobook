// eslint-disable-next-line import/no-cycle
import { Album } from './Album';
// eslint-disable-next-line import/no-cycle
import { MovieArtist } from './MovieArtist';
// eslint-disable-next-line import/no-cycle
import { VideoArtist } from './VideoArtist';

export class Artist {
  public id: string;

  public name: string;

  public external_id?: string;

  public photo_url?: string;

  public info_url: string;

  public movie_artists: MovieArtist[];

  public video_artists: VideoArtist[];

  public albums: Album[];

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.external_id = json.external_id;
    this.photo_url = json.photo_url;
    this.info_url = json.info_url;

    if (json.movie_artists) {
      this.movie_artists = json.movie_artists.map(ma => new MovieArtist(ma));
    } else {
      this.movie_artists = [];
    }

    if (json.video_artists) {
      this.video_artists = json.video_artists.map(va => new VideoArtist(va));
    } else {
      this.video_artists = [];
    }

    if (json.albums) {
      this.albums = json.albums.map(a => new Album(a));
    } else {
      this.albums = [];
    }
  }
}
