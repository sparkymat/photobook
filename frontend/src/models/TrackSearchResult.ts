// eslint-disable-next-line max-classes-per-file
class TrackSearchResultAlbum {
  public albumID: string;

  public title: string;

  public year?: string;

  constructor(json: any) {
    this.albumID = json.id;
    this.title = json.title;

    if (json.year) {
      this.year = json.year;
    }
  }
}

export class TrackSearchResult {
  public trackID: string;

  public title: string;

  public albums: TrackSearchResultAlbum[];

  constructor(json: any) {
    this.trackID = json.id;
    this.title = json.title;

    this.albums = json.albums.map(a => new TrackSearchResultAlbum(a));
  }
}
