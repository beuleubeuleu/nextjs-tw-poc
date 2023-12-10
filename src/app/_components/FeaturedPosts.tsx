import { gql } from "graphql-request";
import Link from "next/link";
import Image from "next/image";
import "server-only";
import { hygraph } from "../../infrastructure/hygraph";

const firstThreePosts = gql`
  {
    posts(first: 3) {
      id
      title
    }
  }
`;

type Posts = {
  posts: {
    id: string;
    title: string;
  }[];
};

async function getPosts() {
  const { posts } = await hygraph.request<Posts>(firstThreePosts);
  if (posts) return posts;
  return null;
}

export default async function FeaturedPosts() {
  const featuredPosts = await getPosts();

  return (
    <section className={"mt-10 p-4"}>
      <h3 className={"mb-2 text-xl"}>Consulte nos fiches tutos</h3>
      <ul className={"flex flex-col items-center justify-center gap-4"}>
        {featuredPosts?.map((post: { id: string; title: string }) => {
          return (
            <li
              key={post.id}
              className={
                "flex items-center justify-between rounded-xl border-2 border-gray-600 p-2"
              }
            >
              <div className={"h-10 w-10 rounded bg-gray-400"}></div>
              <p className={"w-2/3"}>{post.title}</p>
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
