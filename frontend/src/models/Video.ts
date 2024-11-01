import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// eslint-disable-next-line import/no-cycle
import { Movie } from './Movie';
// eslint-disable-next-line import/no-cycle
import { TvShow } from './TvShow';
import { Season } from './Season';
import { Episode } from './Episode';
import { ISO639_1 } from './Language';
// eslint-disable-next-line import/no-cycle
import { VideoArtist } from './VideoArtist';
// eslint-disable-next-line import/no-cycle
import { VideoTrope } from './VideoTrope';
import { Channel } from './Channel';
// eslint-disable-next-line import/no-cycle
import { Album } from './Album';

dayjs.extend(utc);

export type VideoStatus =
  | 'pending_fetch'
  | 'fetching_source'
  | 'awaiting_info'
  | 'ready';

export type VideoType =
  | 'unknown'
  | 'clip'
  | 'trailer'
  | 'song'
  | 'compilation'
  | 'parody'
  | 'fanvideo'
  | 'reaction'
  | 'discussion';

export const VideoTypes: VideoType[] = [
  'unknown',
  'clip',
  'trailer',
  'song',
  'compilation',
  'parody',
  'fanvideo',
  'reaction',
  'discussion',
];

export interface Subtitle {
  url: string;
  languageLabel: string;
  languageCode: string;
}

export class Video {
  public id: string;

  public video_type: VideoType;

  public yt_id: string;

  public title: string;

  public description: string;

  public published_at?: dayjs.Dayjs;

  public long_title: string;

  public status: VideoStatus;

  public updated_at: dayjs.Dayjs;

  public video_url?: string;

  public thumbnail_url?: string;

  public album_id?: string;

  public album?: Album;

  public movie_id?: string;

  public movie?: Movie;

  public tv_show?: TvShow;

  public channel_id?: string;

  public channel?: Channel;

  public season?: Season;

  public episode?: Episode;

  public info_url?: string;

  public lyrics: string;

  public subtitles: Subtitle[];

  public progress_string?: string;

  public video_artists: VideoArtist[];

  public video_tropes: VideoTrope[];

  public disc_number?: number;

  public track_number?: number;

  constructor(json: any) {
    this.id = json.id;
    this.yt_id = json.yt_id;
    this.title = json.title;
    this.long_title = json.title;
    this.lyrics = json.lyrics;
    this.status = json.status;
    this.video_type = json.video_type;
    this.video_url = json.video_url;
    this.thumbnail_url = json.thumbnail_url;
    this.movie_id = json.movie_id;
    this.album_id = json.album_id;
    this.description = json.description;
    this.channel_id = json.channel_id;
    this.updated_at = dayjs.utc(json.updated_at);
    this.info_url = json.info_url;
    this.progress_string = json.progress_string;
    this.disc_number = json.disc_number;
    this.track_number = json.track_number;

    if (json.published_at) {
      this.published_at = dayjs.utc(json.published_at);
    }

    this.subtitles = json.subtitle_urls.map(surl => {
      const parts = surl.split('.');
      parts.pop();
      const langPart = parts.pop();
      const lang = langPart.split('-')[0];

      return {
        url: surl,
        languageCode: lang,
        languageLabel: ISO639_1[lang],
      };
    });

    if (json.movie) {
      this.movie = new Movie(json.movie);
      this.long_title = `${this.movie.title} - ${this.title}`;
    }

    if (json.album) {
      this.album = new Album(json.album);
      this.long_title = `${this.album.title} - ${this.title}`;
    }

    if (json.channel) {
      this.channel = new Channel(json.channel);
      this.long_title = `${this.channel.title} - ${this.title}`;
    }

    if (json.tv_show) {
      this.tv_show = new TvShow(json.tv_show);
    }

    if (json.season) {
      this.season = new Season(json.season);
    }

    if (json.episode) {
      this.episode = new Episode(json.episode);
    }

    if (json.tv_show && json.season && json.episode) {
      this.long_title = `${this.tv_show?.title} - ${this.season?.number}x${this.episode?.number} - ${this.title}`;
    }

    this.video_artists = json.video_artists.map(va => new VideoArtist(va));
    this.video_tropes = json.video_tropes.map(vt => new VideoTrope(vt));
  }

  formattedStatus(): string {
    const formatMap = {
      pending_fetch: 'Waiting to be fetched',
      fetching_source: 'Fetching source',
      awaiting_info: 'Awaiting info',
      ready: 'Ready',
    };

    return formatMap[this.status];
  }
}
