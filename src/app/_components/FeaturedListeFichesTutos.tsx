import Link from "next/link";
import Image from "next/image";
import { getFeaturedFichesTutos } from "../../_applications/FichesTutos/getFeaturedFichesTutos";
import { FicheTuto } from "../../_domain/FicheTuto";
import { FicheTutoGateway } from "../../_infrastructure/Gateway/FicheTutoGateway";

export default async function FeaturedListeFichesTutos() {
  const featuredFichesTutos = await getFeaturedFichesTutos(
    new FicheTutoGateway(),
  );

  return (
    <section className={"mt-10 p-4"}>
      <h3 className={"mb-2 text-xl"}>Consulte nos fiches tutos</h3>
      <ul className={"flex flex-col items-center justify-center gap-4"}>
        {featuredFichesTutos?.map((ficheTuto: FicheTuto) => {
          return (
            <li
              key={ficheTuto.getId()}
              className={
                "flex items-center justify-between rounded-xl border-2 border-gray-600 p-2"
              }
            >
              <div className={"h-10 w-10 rounded bg-gray-400"}></div>
              <p className={"w-2/3"}>{ficheTuto.getTitle()}</p>
              <Link
                href={"/"}
                className={
                  "flex items-center justify-center gap-1 font-bold text-sky-600"
                }
              >
                Voir
                <Image
                  width={24}
                  height={24}
                  alt={""}
                  src={"/images/right-arrow-svgrepo-com.svg"}
                  className={"font-bold"}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
