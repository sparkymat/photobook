import { Video } from './Video';

export class PlaylistItem {
  public id: string;

  public position: number;

  public video: Video;

  constructor(json: any) {
    this.id = json.id;
    this.position = json.position;
    this.video = new Video(json.video);
  }
}
