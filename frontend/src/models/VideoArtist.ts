// eslint-disable-next-line import/no-cycle
import { Artist } from './Artist';
// eslint-disable-next-line import/no-cycle
import { Video } from './Video';

export const ArtistTypes = [
  'acoustic guitar',
  'arranger',
  'bass guitar',
  'composer',
  'drums (drum set)',
  'electric bass guitar',
  'electric guitar',
  'engineer',
  'flute',
  'guitar',
  'instrument',
  'keyboard',
  'lyricist',
  'mix',
  'music',
  'organ',
  'pedal steel guitar',
  'percussion',
  'performance',
  'performer',
  'piano',
  'producer',
  'programming',
  'recording',
  'sound',
  'synthesizer',
  'vocal',
  'writer',
];

export type ArtistType =
  | 'acoustic guitar'
  | 'arranger'
  | 'bass guitar'
  | 'composer'
  | 'drums (drum set)'
  | 'electric bass guitar'
  | 'electric guitar'
  | 'engineer'
  | 'flute'
  | 'guitar'
  | 'instrument'
  | 'keyboard'
  | 'lyricist'
  | 'mix'
  | 'music'
  | 'organ'
  | 'pedal steel guitar'
  | 'percussion'
  | 'performance'
  | 'performer'
  | 'piano'
  | 'producer'
  | 'programming'
  | 'recording'
  | 'sound'
  | 'synthesizer'
  | 'vocal'
  | 'writer';

export class VideoArtist {
  public id: string;

  public video_id: string;

  public artist_id: string;

  public artist?: Artist;

  public video?: Video;

  public artist_type: ArtistType;

  constructor(json: any) {
    this.id = json.id;
    this.artist_id = json.artist_id;
    this.video_id = json.video_id;
    this.artist_type = json.artist_type;

    if (json.artist) {
      this.artist = new Artist(json.artist);
    }

    if (json.video) {
      this.video = new Video(json.video);
    }
  }
}
