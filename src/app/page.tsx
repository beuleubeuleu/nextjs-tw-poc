import { Hero } from "./_components/_ui/Hero";
import FeaturedListeFichesTutos from "./_components/FeaturedListeFichesTutos";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div>
        <Hero />
        <FeaturedListeFichesTutos />
        <div
          className={
            "flex flex-col items-center justify-center gap-2 p-4 text-xl"
          }
        >
          <Link
            href={"/nos-fiches-tutos"}
            className={
              "center w-full rounded-full bg-amber-500 py-4 text-center"
            }
          >
            Voir toutes nos fiches tutos 📚
          </Link>
          <Link
            href={"/trouver-de-l-aide"}
            className={
              "center w-full  rounded-full border-2 border-sky-500 py-4 text-center font-bold text-sky-600"
            }
          >
            Trouver de l'aide en urgence
          </Link>
        </div>
      </div>
    </main>
  );
}
