import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
export default function Category({ postsData, categoryTitle }) {
  return (
    <main className="bg-postbg1">
      <NextSeo title={`${categoryTitle} Archives`} />
      <div className="post-header bg-bannerColor flex justify-center py-7 mb-16">
        {/* <a href="/"> */}{" "}
        <Image src="/img/post-banner.png" alt="logo" height={120} width={240} />
        {/* </a> */}
      </div>
      <div className="bg-postbg1 px-2">
        <div className="md:px-20 text-gray-400">
          <div className=" py-8 bg-white text-heading font-bold px-4 md:px-20">
            <h1 className="capitalize text-5xl">{categoryTitle}</h1>{" "}
          </div>
          <div className="px-4 md:px-20 bg-postbg2">
            {postsData.map((post) => (
              <div key={post.id} className=" border-b-2 p-2">
                <div className="text-2xl md:text-3xl pt-10 font-bold">
                  {/* <a
                    href={`/posts/${post.slug}`}
                    // className={""}
                  > */}
                  <Link href={`/posts/${post.slug}`}>
                    {post.title.rendered}
                  </Link>
                  {/* </a> */}
                </div>
                <div className="text-sm text-heading my-4 inline-flex">
                  {" "}
                  <span>{post.totalComments} Comments / </span>
                  {"  "}
                  {post.category.length &&
                    post.category.map((cat) => (
                      <span className="mr-0.5" key={cat.cat_ID}>
                        {/* <a
                          href={`/category/${cat.slug}`}
                          className="inline-block"
                        > */}
                        <Link href={`/category/${cat.slug}`} passHref={true}>
                          <p>
                            {"  "} {cat.name}
                          </p>
                        </Link>
                        {/* </a> */}
                      </span>
                    ))}
                  <span>
                    {" "}
                    {/* <a
                      href={`/author/${post.author.name + "-" + 1}`}
                      className="inline-block"
                    > */}
                    <Link
                      passHref={true}
                      href={`/author/${post.author.name + "-" + 1}`}
                    >
                      <p> By {post.author.name}</p>
                    </Link>
                    {/* </a> */}
                  </span>
                </div>
                <div
                  className="my-8"
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 380),
                  }}
                ></div>
                {/* <a
                  href={`/posts/${post.slug}`}
                  className={"mb-10 text-heading"}
                > */}
                <Link passHref={true} href={`/posts/${post.slug}`}>
                  <p className="text-heading"> READ MORE</p>
                </Link>
                {/* </a> */}
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticPaths = async () => {
  const catPath = [
    "charity-programs",
    "environment",
    "global-issues",
    "green-projects",
    "nature-problems",
    "saving-planet",
    "uncategorized",
    "weather-updates",
  ];

  const paths = catPath.slice(0, 1).map((post) => {
    return {
      params: { slug: post.toString() },
    };
  });
  return {
    paths,
    fallback: false,
    // paths:[{slug:}]
  };
};

export const getStaticProps = async (ctx) => {
  const dynamic = ctx.params !== undefined ? ctx.params.slug : "404";
  const cat = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp/v2/categories?slug=${dynamic}`
  );
  const posts = await cat.json();

  if (posts.length == 0) {
    return {
      props: {
        postsData: null,
        error: true,
      },
    };
  }
  const id = posts[0].id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wpr/v1/category/${id}`
  ).then();

  const postsData = await res.json();

  return {
    props: {
      postsData,
      categoryTitle: dynamic,
      error: false,
    },
  };
};
