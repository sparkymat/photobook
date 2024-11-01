// eslint-disable-next-line import/no-cycle
import {
  VideoRelationType,
  VideoRelationTypeString,
} from './VideoRelationType';
// eslint-disable-next-line import/no-cycle
import { Video } from './Video';

export class VideoRelation {
  public id: string;

  public relation_type: VideoRelationType;

  public current_video_id: string;

  public source_video_id: string;

  public current_video?: Video;

  public source_video?: Video;

  constructor(json: any) {
    this.id = json.id;
    this.current_video_id = json.current_video_id;
    this.source_video_id = json.source_video_id;
    this.relation_type = json.relation_type;

    if (json.current_video) {
      this.current_video = new Video(json.current_video);
    }

    if (json.source_video) {
      this.source_video = new Video(json.source_video);
    }
  }

  relatedVideoFor(v: Video | undefined) {
    if (this.current_video_id === v?.id) {
      return this.source_video;
    }

    return this.current_video;
  }

  relationLabel(v: Video | undefined) {
    const original = this.source_video_id === v?.id;
    return VideoRelationTypeString(this.relation_type, original);
  }
}
