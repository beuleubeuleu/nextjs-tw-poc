import Link from "next/link";
import Image from "next/image";
import "server-only";
import { getFeaturedPosts } from "../../_applications/Posts/getFeaturedPosts";
import { Post } from "../../_applications/Posts/Post";

export default async function FeaturedPosts() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <section className={"mt-10 p-4"}>
      <h3 className={"mb-2 text-xl"}>Consulte nos fiches tutos</h3>
      <ul className={"flex flex-col items-center justify-center gap-4"}>
        {featuredPosts?.map((post: Post) => {
          return (
            <li
              key={post.getId()}
              className={
                "flex items-center justify-between rounded-xl border-2 border-gray-600 p-2"
              }
            >
              <div className={"h-10 w-10 rounded bg-gray-400"}></div>
              <p className={"w-2/3"}>{post.getTitle()}</p>
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
