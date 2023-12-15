import Link from "next/link";
import Footer from "../_components/_ui/Footer";
import ListeFichesTutos from "../_components/ListeFichesTutos";
import { getUnePageDeFichesTutos } from "../../_applications/Posts/getUnePageDeFichesTutos";

interface SearchParamsProps {
  searchParams: {
    page: string;
  };
}

export default async function NosFichesTutos({
  searchParams,
}: SearchParamsProps) {
  let page: number = Number(searchParams.page) ? Number(searchParams.page) : 1;
  const { posts, nombreTotalDeFichesTutos, hasPreviousPage, hasNextPage } =
    await getUnePageDeFichesTutos(page);

  return (
    <main className={""}>
      <h3 className={" mt-10 px-4 text-xl "}>
        {nombreTotalDeFichesTutos} résultats
      </h3>
      <hr className=" mx-4 mt-2 h-1 w-20 rounded-full border-0 bg-amber-600" />

      <button className={" mt-10 px-4"}>Modifier mes filtres</button>
      <ListeFichesTutos fichesTutos={posts} />

      <div className="my-8 flex items-center justify-center gap-5">
        <Link
          href={`/nos-fiches-tutos?page=${hasPreviousPage ? page - 1 : 1}`}
          className="rounded-md px-5 py-2 text-gray-600 hover:underline"
        >
          Précédent
        </Link>
        <p className={"rounded border border-gray-400 px-2"}>
          {page}/{Math.floor(nombreTotalDeFichesTutos / 5) + 1}
        </p>
        <Link
          href={`/nos-fiches-tutos?page=${hasNextPage ? page + 1 : page}`}
          className="rounded-md px-5 py-2 text-gray-600 hover:underline"
        >
          Suivant
        </Link>
      </div>

      <Footer />
    </main>
  );
}
