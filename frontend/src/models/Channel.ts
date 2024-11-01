export class Channel {
  public id: string;

  public title: string;

  public image_url: string;

  public info_url: string;

  constructor(json: any) {
    if (!json) {
      return;
    }

    this.id = json.id;
    this.title = json.title;
    this.info_url = json.info_url;
    this.image_url = json.image_url;
  }
}
