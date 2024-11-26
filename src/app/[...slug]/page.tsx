

// type Props = {
//   params: { slug: string[] };
// };

// interface Post {
//   title: string;
//   slug: string;
// }

// async function fetchContent(slug: string[]) {
//   let content = await getContentBySlug(slug.join("/"));
//   if (!content) {
//     const parentSlug = slug[0];
//     const parentContent = await getContentBySlug(parentSlug);
//     if (parentContent?.type === "category") {
//       const childSlug = slug.slice(1).join("/");
//       content = await getContentBySlug(childSlug);
//       if (content) {
//         content = { ...content, parentSlug, isSubCategory: true };
//       }
//     }
//   }
//   return content;
// }

// export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
//   const content = await fetchContent(params.slug);
//   if (!content) {
//     return {
//       title: "Not Found",
//       description: "The page you are looking for does not exist.",
//     };
//   }

//   const description =
//     content.description ||
//     (content.content ? content.content.substring(0, 160) : "");

//   const canonicalUrl = `https://www.tirespedia.com/${params.slug.join("/")}`;

//   switch (content.type) {
//     case "category":
//       return {
//         title: content.name,
//         description,
//         alternates: {
//           canonical: canonicalUrl,
//         },
//         robots: {
//           index: true,
//           follow: true,
//           googleBot: {
//             index: true,
//             follow: true,
//             "max-video-preview": -1,
//             "max-image-preview": "large",
//             "max-snippet": -1,
//           },
//         },
//       };
//     case "page":
//     case "post":
//       return {
//         title: content.title,
//         description: content.seo?.metaDesc || description,
//         robots: {
//           index: true,
//           follow: true,
//           googleBot: {
//             index: true,
//             follow: true,
//             "max-video-preview": -1,
//             "max-image-preview": "large",
//             "max-snippet": -1,
//           },
//         },
//         alternates: {
//           canonical: canonicalUrl,
//         },
//       };
//     default:
//       return {
//         title: "Content",
//         description: "Dynamic content page",
//         alternates: {
//           canonical: canonicalUrl,
//         },
//       };
//   }
// }

// export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
//   const content = await fetchContent(params.slug);
//   if (!content) notFound();

//   const schemaMarkup = getSchemaMarkup(content);

//   const jsonLd = JSON.stringify(schemaMarkup);

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: jsonLd }}
//       />
//       {content.type === "page" ? (
//         <Page page={content} />
//       ) : content.type === "post" ? (
//         <Article post={content} />
//       ) : (
//         notFound()
//       )}
//     </>
//   );
// }

// export async function generateStaticParams() {
  // const slugs = await getAllSlugs();
  // return slugs.map((slug) => ({ slug: slug.split("/") }));
// }

// function getSchemaMarkup(content: any) {
//   switch (content.type) {
//     case "post":
//       return {
//         "@context": "https://schema.org",
//         "@type": "Article",
//         headline: content.title,
//         description: content.seo?.metaDesc || content.description,
//         image: content.featuredImage?.node?.sourceUrl || "",
//         author: {
//           "@type": "Person",
//           name: content.author?.node?.name,
//         },
//         datePublished: content.seo?.opengraphPublishedTime,
//         dateModified: content.seo?.opengraphModifiedTime,
//       };
//     case "page":
//       return {
//         "@context": "https://schema.org",
//         "@type": "WebPage",
//         name: content.title,
//         description: content.description,
//       };
//     case "category":
//       return {
//         "@context": "https://schema.org",
//         "@type": "ItemList",
//         name: content.name,
//         itemListElement: Array.isArray(content.posts)
//           ? content.posts.map((post: Post, index: number) => ({
//               "@type": "ListItem",
//               position: index + 1,
//               item: {
//                 "@type": "BlogPosting",
//                 name: post.title,
//                 url: `/${post.slug}`,
//               },
//             }))
//           : [],
//       };
//     default:
//       return {
//         "@context": "https://schema.org",
//         "@type": "WebPage",
//         name: "Dynamic Content Page",
//       };
//   }
// }

