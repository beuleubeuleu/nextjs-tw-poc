import Link from "next/link";
import Image from "next/image";
import { FicheTuto } from "../../_applications/Posts/FicheTuto";

type ListeFichesTutosProps = { fichesTutos: FicheTuto[] };

export default function ListeFichesTutos({
  fichesTutos,
}: ListeFichesTutosProps) {
  return (
    <ul
      className={
        "mt-2 flex min-h-[488px] w-full flex-col items-center justify-start gap-6"
      }
    >
      {fichesTutos.map((ficheTuto) => {
        return (
          <li
            key={ficheTuto.getId()}
            className={
              "flex w-full items-center justify-between bg-[#B7D5F4] p-4"
            }
          >
            <div className={"h-10 w-10 rounded bg-[#264C67]"}></div>
            <p className={"w-2/3 text-gray-700"}>{ficheTuto.getTitle()}</p>
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
  );
}
