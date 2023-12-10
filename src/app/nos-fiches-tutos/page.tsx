import { gql } from "graphql-request";
import { hygraph } from "../../infrastructure/hygraph";

import Link from "next/link";
import Image from "next/image";
import Footer from "../_components/_ui/Footer";

const getPostsQuery = (page: number) => gql`
  {
    postsConnection(first: 5, skip: ${page ? (page - 1) * 5 : 1}) {
      edges {
        node {
          title
          id
        }
      }
      aggregate {
        count
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

type data = {
  postsConnection: {
    edges: {
      node: { title: string; id: string };
    }[];
    aggregate: {
      count: number;
    };
    pageInfo: {
      pageSize: number;
      hasNextPage: Boolean;
      hasPreviousPage: Boolean;
    };
  };
};

async function getPosts(page: number) {
  const { postsConnection } = await hygraph.request<data>(getPostsQuery(page));
  if (postsConnection) return postsConnection;
  return null;
}

interface SearchParamsProps {
  searchParams: {
    page: string;
  };
}

export default async function NosFichesTutos({
  searchParams,
}: SearchParamsProps) {
  let page: number = Number(searchParams.page) ? Number(searchParams.page) : 1;
  const data = await getPosts(page);
  {
    if (!data) return "Erreur articles";
  }
  const posts = data.edges;
  const { hasPreviousPage, hasNextPage } = data.pageInfo;
  const totalPosts = data.aggregate.count;

  return (
    <main className={""}>
      <h3 className={" mt-10 px-4 text-xl "}>{totalPosts} résultats</h3>
      <hr
        className={" mx-4 mt-2 h-1 w-20 rounded-full border-0 bg-amber-600"}
      />
      <button className={" mt-10 px-4"}>Modifier mes filtres</button>
      <ul
        className={
          "mt-2 flex min-h-[488px] w-full flex-col items-center justify-start gap-6"
        }
      >
        {posts.map((node: { node: { id: string; title: string } }) => {
          const post = node.node;
          return (
            <li
              key={post.id}
              className={
                "flex w-full items-center justify-between bg-[#B7D5F4] p-4"
              }
            >
              <div className={"h-10 w-10 rounded bg-[#264C67]"}></div>
              <p className={"w-2/3 text-gray-700"}>{post.title}</p>
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
      <div className="my-8 flex items-center justify-center gap-5">
        <Link
          href={`/nos-fiches-tutos?page=${hasPreviousPage ? page - 1 : 1}`}
          className="rounded-md px-5 py-2 text-gray-600 hover:underline"
        >
          Précédent
        </Link>
        <p className={"rounded border border-gray-400 px-2"}>
          {page}/{Math.floor(totalPosts / 5) + 1}
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
