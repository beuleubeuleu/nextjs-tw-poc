import { Adresse, AdresseRepo } from "../../_domain/Adresse";
import { AdresseGateway } from "../../_infrastructure/Gateway/AdresseGateway";

export async function getAllAdresses(
  adresseRepo: AdresseRepo,
): Promise<Adresse[]> {
  return adresseRepo.getAllAdresses();
}
