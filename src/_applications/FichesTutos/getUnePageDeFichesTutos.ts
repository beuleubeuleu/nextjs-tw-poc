import { FicheTutoRepo } from "../../_domain/FicheTuto";

export async function getUnePageDeFichesTutos(
  page: number,
  ficheTutoRepo: FicheTutoRepo,
) {
  return ficheTutoRepo.getUnePageDeFichesTutos(page);
}
