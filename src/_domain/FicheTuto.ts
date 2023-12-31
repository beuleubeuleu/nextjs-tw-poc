export class FicheTuto {
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

export interface FicheTutoRepo {
  getFeatured(): Promise<FicheTuto[]>;

  getUnePageDeFichesTutos(page: number): Promise<{
    fichesTutos: FicheTuto[];
    nombreTotalDeFichesTutos: number;
    hasPreviousPage: Boolean;
    hasNextPage: Boolean;
  }>;
}
