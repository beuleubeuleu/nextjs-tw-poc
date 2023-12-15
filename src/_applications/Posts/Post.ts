export class Post {
  private readonly id: string;
  private readonly title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }
}
