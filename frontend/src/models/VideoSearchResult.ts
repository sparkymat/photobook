export class VideoSearchResult {
  public yt_id: string;

  public title: string;

  public channel: string;

  public thumbnail_url: string;

  public video_id: string | undefined;

  constructor(json: any) {
    this.yt_id = json.yt_id;
    this.title = json.title;
    this.thumbnail_url = json.thumbnail_url;
    this.channel = json.channel;

    if (json.video_id) {
      this.video_id = json.video_id;
    }
  }
}
