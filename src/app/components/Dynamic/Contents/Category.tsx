import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoChevronRight, GoPlus } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Archivo } from "next/font/google";
import { RxDividerVertical } from "react-icons/rx";
import RecentPosts from "@/app/components/Dynamic/Sidebar/RecentPosts";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

interface Post {
  title: string;
  slug: string;
  content: string;
  date: string;
  seo: {
    readingTime: number;
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
      title: string;
    } | null;
  } | null;
}

interface CategoryProps {
  category: {
    name: string;
    description: string;
    categoryImage: string;
    slug: string;
    posts: {
      nodes: Post[];
    };
    children?: {
      nodes: {
        posts: { nodes: Post[] };
        name: string;
        slug: string;
        description: string;
      }[];
    };
  };
}

const truncateContent = (content: string, maxLength: number) => {
  // First, strip HTML tags
  const strippedContent = content.replace(/<[^>]*>/g, "");
  // Then normalize whitespace
  const normalizedContent = strippedContent.replace(/\s+/g, " ").trim();

  if (normalizedContent.length > maxLength) {
    return normalizedContent.substring(0, maxLength).trim() + "...";
  }
  return normalizedContent;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export default async function Category({ category }: CategoryProps) {
  const defaultImage = `https://dev-tastyeats.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`;
  return (
    <main>
      <header className="bg-white py-2.5 !pb-[11px]">
        <nav
          className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex justify-start items-center gap-2 !mb-0">
            <li>
              <Link
                href="/"
                className="text-slate-800 transition-all hover:text-amber-950 font-semibold text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <GoChevronRight className="text-slate-400" aria-hidden="true" />
            </li>
            <li
              className="text-slate-800 transition-all hover:text-amber-950 font-semibold text-sm"
              aria-current="page"
            >
              {category.name}
            </li>
          </ol>
        </nav>
      </header>
      <section className="bg-amber-50 py-10 border-b-2 border-amber-100">
        <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6">
          <h1
            className={`text-4xl text-center md:text-5xl md:leading-[60px] text-gray-900 font-black mb-5 ${archivo.className}`}
          >
            {category.name}
          </h1>
          <p className="text-slate-800 text-lg text-center max-w-4xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mt-16 mb-16">
        <div className="lg:flex gap-12 mt-5">
          <section className="lg:w-9/12 lg:border-r-[2px] lg:border-slate-100 lg:pr-12">
            <h2
              className={`${archivo.className} text-4xl -mb-3.5 text-gray-900 font-black relative z-30`}
            >
              Featured Articles
            </h2>
            <div className="h-2.5 bg-amber-200 mb-7 max-w-[280px]"></div>

            <section className="columns-1 sm:columns-2 lg:columns-2 xl:columns-2 gap-6 space-y-5">
              {category.posts.nodes.slice(0, 2).map((post) => (
                <div
                  className="break-inside-avoid bg-white shadow-md overflow-hidden"
                  key={post.slug}
                >
                  <Link
                    href={`/${post.slug}`}
                    aria-label={`View recipe: ${post.title}`}
                  >
                    <Image
                      src={
                        post.featuredImage?.node?.sourceUrl ||
                        `https://dev-tastyeats.pantheonsite.io/wp-content/uploads/2024/10/loading.webp`
                      }
                      alt={`${post.title}`}
                      title={`${post.featuredImage?.node?.title || post.title}`}
                      width={400}
                      height={280}
                      objectFit="cover"
                      className="w-full h-auto"
                    />
                  </Link>
                  <div className="flex justify-center items-center">
                    <Link
                      href={`/${post.slug}`}
                      className="rounded-full h-20 w-20 bg-amber-500 border-[5px] border-white transition-all hover:bg-amber-400 text-gray-900 -mt-10 flex justify-center items-center"
                      aria-label={`Read more about ${post.title}`}
                    >
                      <GoPlus className="size-10" />
                    </Link>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-start items-center gap-1 mt-1 mb-4">
                      <Link
                        href="/about"
                        className="animated-underline text-slate-800 text-sm font-semibold underline decoration-amber-500 underline-offset-2"
                        aria-label="About the author"
                      >
                        Easton Boehm
                      </Link>
                      <span>
                        <RxDividerVertical className="text-slate-300" />
                      </span>
                      <time
                        dateTime={post.date}
                        className="text-slate-500 text-sm"
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>
                    <Link
                      href={`/${post.slug}`}
                      aria-label={`Read ${post.title}`}
                    >
                      <h2 className="text-lg leading-6 font-bold mb-3 text-gray-800 transition-all hover:text-gray-900 capitalize">
                        {post.title}
                      </h2>
                    </Link>
                    {/* Replace dangerouslySetInnerHTML with direct text rendering */}
                    <p className="text-slate-500 text-sm">
                      {truncateContent(post.content, 100)}
                    </p>
                  </div>
                </div>
              ))}
            </section>

            <div className="border-y-2 border-slate-200 my-12 py-3">
              <p
                className={`${archivo.className} text-xl text-center text-gray-900 font-semibold`}
              >
                More About {category.name}
              </p>
            </div>

            <div>
              {category.posts.nodes.map((post) => (
                <article key={post.slug} className="mb-3">
                  <div className="container grid grid-cols-12 mx-auto bg-white shadow-md">
                    <div
                      className="bg-no-repeat bg-cover bg-center bg-gray-700 col-span-full lg:col-span-4"
                      title={post.featuredImage?.node?.title || post.title}
                      style={{
                        backgroundImage: `url(${
                          post.featuredImage?.node?.sourceUrl || defaultImage
                        })`,
                      }}
                      role="img"
                      aria-label={
                        post.featuredImage?.node?.altText || post.title
                      }
                    ></div>
                    <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
                      <div className="flex justify-start">
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-200 font-semibold text-amber-700">
                          {category.name}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold mt-3 text-gray-900">
                        <Link rel="noopener noreferrer" href={`/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="flex-1 pt-2 text-slate-900">
                        {truncateContent(post.content || "", 110)}
                      </p>
                      <Link
                        rel="noopener noreferrer"
                        href={`/${post.slug}`}
                        className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-gray-800"
                      >
                        <span className="animated-underline font-semibold underline decoration-amber-500 underline-offset-2">
                          Learn more{" "}
                          <BsArrowRight
                            className="inline size-4 relative -top-[0.5px] ml-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                      <footer className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <span className="self-center text-sm text-slate-700">
                            <FiUser
                              className="inline size-4 relative -top-[1px]"
                              aria-hidden="true"
                            />{" "}
                            Easton Boehm
                          </span>
                        </div>
                        <time
                          dateTime={post.date}
                          className="text-xs text-slate-700"
                        >
                          {formatDate(post.date)}
                        </time>
                      </footer>
                    </div>
                  </div>
                  <div className="border-b-[1px] border-slate-200 mb-3"></div>
                </article>
              ))}
            </div>
          </section>
          <aside className="lg:w-3/12">
            <RecentPosts />
          </aside>
        </div>
      </div>
    </main>
  );
}
