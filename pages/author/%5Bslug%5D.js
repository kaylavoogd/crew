import Link from "next/link";
import Image from "next/image";
import PostFooter from "../../components/Layout/PostFooter";
import { NextSeo } from "next-seo";

export default function authorPost({ postsData, categoryTitle }) {
  return (
    <main className="bg-postbg1">
      <NextSeo title={`${categoryTitle} Archives`} />
      <div className="post-header bg-bannerColor flex justify-center md:py-7 mb-12 md:mb-16">
        {/* <a href="/"> */}{" "}
        <Image src="/img/post-banner.png" alt="logo" height={120} width={240} />
        {/* </a> */}
      </div>
      <div className="bg-postbg1 px-2 ">
        <div className="md:px-20 text-gray-400">
          <div className="py-8 bg-white text-heading font-bold px-4 md:px-20">
            <h1 className="capitalize text-5xl">{categoryTitle}</h1>{" "}
          </div>
          <div className="px-4 md:px-20 bg-postbg2 pb-2">
            {postsData.map((post) => (
              <div key={post.id} className=" border-b-2 p-2">
                <div className="text-3xl pt-10 font-bold">
                  {post.title.rendered}{" "}
                </div>
                <div className="text-sm text-heading my-4 inline-flex">
                  {" "}
                  <span>{post.totalComments} Comments / </span>{" "}
                  {post.category.length &&
                    post.category.map((cat) => (
                      <span className="mr-0.5" key={cat.cat_ID}>
                        {/* <a
                          href={`/category/${cat.slug}`}
                          className="inline-block"
                        > */}
                        <Link passHref={true} href={`/category/${cat.slug}`}>
                          <p> {cat.name}</p>
                        </Link>
                        {/* </a> */}
                      </span>
                    ))}
                  <span>By {post.author.name}</span>
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
                <Link href={`/posts/${post.slug}`}>READ MORE</Link>
                {/* </a> */}
              </div>
            ))}{" "}
          </div>
        </div>
        <PostFooter />
      </div>
    </main>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wpr/v1/authors`
  ).then();
  const data = await res.json();

  const paths = data.slice(0, 1).map((author) => {
    return {
      params: {
        slug: `${author.name.toLowerCase().split(" ").join("-")}-${author.id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
    // paths:[{slug:}]
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wpr/v1/author/${params.slug
      .split("-")
      .pop()}`
  ).then();

  const postsData = await res.json();

  ``;
  if (postsData.length > 0) {
    return {
      props: {
        postsData: postsData,
        categoryTitle: params.slug.split("-")[0],

        error: false,
      },
    };
  } else {
    return {
      props: {
        postsData: null,
        categoryTitle: params.slug.split("-").pop(),

        error: true,
      },
    };
  }
};
