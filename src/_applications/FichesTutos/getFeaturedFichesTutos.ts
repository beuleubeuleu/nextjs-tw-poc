import { FicheTuto, FicheTutoRepo } from "../../_domain/FicheTuto";

export async function getFeaturedFichesTutos(
  ficheTutoRepo: FicheTutoRepo,
): Promise<FicheTuto[]> {
  return ficheTutoRepo.getFeatured();
}
