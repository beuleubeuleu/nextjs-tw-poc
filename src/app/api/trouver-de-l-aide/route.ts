import { getAllAdresses } from "../../../_applications/Adresses/getAllAdresses";
import { AdresseGateway } from "../../../_infrastructure/Gateway/AdresseGateway";

export async function GET(request: Request): Promise<any> {
  const adresses = await getAllAdresses(new AdresseGateway());
  if (adresses) return new Response(JSON.stringify(adresses));
  return null;
}
