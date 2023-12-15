import { getAllAdresses } from "../../../_applications/Adresses/getAllAdresses";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request): Promise<any> {
  const adresses = await getAllAdresses();
  if (adresses) return new Response(JSON.stringify(adresses));
  return null;
}
