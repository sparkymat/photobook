export class Playlist {
  public id: string;

  public name: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
  }
}
