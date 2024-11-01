// eslint-disable-next-line import/no-cycle
import { VideoTrope } from './VideoTrope';

export class Trope {
  public id: string;

  public name: string;

  public external_url: string;

  public video_tropes: VideoTrope[];

  public video_count: number;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.external_url = json.external_url;
    this.video_count = json.video_count;

    if (json.video_tropes) {
      this.video_tropes = json.video_tropes.map(vt => new VideoTrope(vt));
    } else {
      this.video_tropes = [];
    }
  }
}
