// eslint-disable-next-line import/no-cycle
import { Trope } from './Trope';
// eslint-disable-next-line import/no-cycle
import { Video } from './Video';

export class VideoTrope {
  public id: string;

  public video_id: string;

  public trope_id: string;

  public trope?: Trope;

  public video?: Video;

  constructor(json: any) {
    this.id = json.id;
    this.video_id = json.video_id;
    this.trope_id = json.trope_id;

    if (json.trope) {
      this.trope = new Trope(json.trope);
    }

    if (json.video) {
      this.video = new Video(json.video);
    }
  }
}
