import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// eslint-disable-next-line import/no-cycle
import { Video } from './Video';

dayjs.extend(utc);

export class Album {
  public id: string;

  public createdAt: dayjs.Dayjs;

  public updatedAt: dayjs.Dayjs;

  public title: string;

  public mbReleaseGroupId?: string;

  public mbReleaseId?: string;

  public thumbnail?: string;

  public videos: Video[];

  constructor(json: Album) {
    if (!json) {
      return;
    }

    this.id = json.id;
    this.createdAt = dayjs.utc(json.createdAt);
    this.updatedAt = dayjs.utc(json.updatedAt);

    this.title = json.title;

    if (json.mbReleaseGroupId) {
      this.mbReleaseGroupId = json.mbReleaseGroupId;
    }

    if (json.mbReleaseId) {
      this.mbReleaseId = json.mbReleaseId;
    }

    if (json.thumbnail) {
      this.thumbnail = json.thumbnail;
    }

    if (json.videos) {
      this.videos = json.videos.map(v => new Video(v));
    }
  }
}
