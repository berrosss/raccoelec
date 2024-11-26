import { home_blog_articles } from "@/apis/graphql/articles";
import Link from "next/link";
import React from "react";

const truncateContent = (content: string, maxLength: number) => {
  return content.length > maxLength
    ? content.substring(0, maxLength) + "..."
    : content;
};

const Blog = async () => {
  const posts = await home_blog_articles();

  return (
    <div className="mb-20">
      <h2 className="text-2xl text-zinc-950 font-bold text-center mb-10">
        Actualités Business par Reccoelec
      </h2>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-0 mx-auto">
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <Link
                href={`/${post.slug}`}
                key={post.id}
                className="group flex flex-col focus:outline-none"
              >
                <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
                  <img
                    className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
                    src={
                      post.featuredImage?.node?.sourceUrl ||
                      `https://dev-tastyeats.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`
                    }
                    alt={post.title}
                    title={post.featuredImage?.node.title || post.title}
                  />
                  <span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-[#1523dc] text-white py-1.5 px-3 dark:bg-neutral-900">
                    {post.categories.nodes[0].name}
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2 mt-3 mb-3">
                  <p className="text-xs text-gray-500">Raccoelec</p>
                  <p className="text-xs text-gray-500">-</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-zinc-950">
                    {post.title}
                  </h3>
                  <p
                    className="mt-1.5 text-gray-500 dark:text-neutral-500 text-xs"
                    dangerouslySetInnerHTML={{
                      __html: truncateContent(post.seo.metaDesc, 100),
                    }}
                    suppressHydrationWarning={true}
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center">There&apos;s no blog posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
