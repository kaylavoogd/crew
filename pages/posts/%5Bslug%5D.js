import formatDate from "../../utils/date-format";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import PostFooter from "../../components/Layout/PostFooter";
import { NextSeo } from "next-seo";

export default function Post({ postsData }) {
  const [comment_author, setName] = useState("");
  const [comment_author_email, setEmail] = useState("");
  const [comment_author_url, setWebsite] = useState("");
  const [comment_content, setComment] = useState("");
  if (postsData == undefined) return <div>Loading...</div>;

  const { title, comments, category, author, content, id, slug } = postsData;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (
      !comment_author ||
      !comment_author_email ||
      !comment_author_url ||
      !comment_content
    ) {
      console.log(`alll fields are required`);
      return;
    }
    const data = {
      comment_author,
      comment_author_email,
      comment_author_url,
      comment_content,
      comment_post_ID: id,
      // comment_parent: comment.comment_ID
    };
    const sendReqData = {
      url: `${process.env.NEXT_PUBLIC_BLOG_URL}/wpr/v1/add-comment-next`,
      data,
      method: "POST",
    };
    axios(sendReqData).then((resp) => {
      if (resp.data) {
        alert("Comment Added To This Post");
      }
    });
  };
  return (
    <>
      <NextSeo
        title={title.rendered}
        canonical={`${process.env.NEXT_PUBLIC_BLOG_URL}/posts/${slug}`}
        openGraph={{
          type: "article",
          locale: "en_US",
          description: content,
        }}
      />
      <div className="post-header bg-bannerColor flex justify-center py-7">
        {/* <a href="/"> */}{" "}
        <Image src="/img/post-banner.png" alt="logo" height={120} width={240} />
        {/* </a> */}
      </div>
      <div className=" bg-postbg1 md:p-16 ">
        <div className="container bg-postbg2 text-gray-400 py-16 md:px-24 px-6 ">
          <div className="text-heading  font-bold">
            <h1
              className="text-3xl mb-3"
              dangerouslySetInnerHTML={{ __html: title.rendered }}
            ></h1>
            <div className="text-sm inline-flex">
              {" "}
              <span>{comments.length} Comments / </span>{" "}
              {category.length &&
                category.map((cat) => (
                  <span className="mr-0.5 " key={cat.cat_ID}>
                    {/* <a href={`/category/${cat.slug}`} className="inline-block"> */}
                    <Link href={`/category/${cat.slug}`} passHref={true}>
                      <p> {cat.name} ,</p>
                    </Link>
                    {/* </a> */}
                  </span>
                ))}
              <span>
                {/* <a
                  href={`/author/${author.name + "-" + author.id}`}
                  className="inline-block"
                > */}
                <Link
                  passHref={true}
                  href={`/author/${author.name + "-" + author.id}`}
                >
                  <p> By {author.name}</p>
                </Link>
                {/* </a> */}
              </span>
            </div>
          </div>

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
        {comments.length && (
          <div className="comments my-16 bg-postbg2 text-heading md:p-20 p-4">
            <p className="text-4xl font-bold">
              {" "}
              {comments.length} thoughts on {title.rendered}{" "}
            </p>
            {comments

              .filter((cmt) => cmt.comment_approved == "1")
              .reverse()
              .map((comment) => (
                <div
                  key={comment.comment_ID}
                  className={`my-4 ${
                    comment.comment_parent !== "0" ? "pl-6" : ""
                  }`}
                >
                  <div
                    className="text-sm uppercase font-semibold mt-3"
                    dangerouslySetInnerHTML={{ __html: comment.comment_author }}
                  ></div>
                  <div className="text-xs">
                    {formatDate(comment.comment_date)}
                  </div>
                  <div
                    className="text-md my-3 text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: comment.comment_content,
                    }}
                  ></div>
                </div>
              ))}
            <div></div>
          </div>
        )}

        <div className="bg-postbg2 md:p-20 p-6 text-gray-400">
          <p className="text-2xl text-heading">Leave A Comment</p>
          <p>
            Your email address will not be published. Required fields are marked
            *
          </p>
          <form onSubmit={handleCommentSubmit}>
            <div className="my-4 border ">
              <textarea
                rows="8"
                className="w-full py-2 px-4 focus:outline-none focus:ring focus:border-red"
                placeholder="Your Comment *"
                value={comment_content}
                required
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="my-4 border ">
                <input
                  type="text"
                  className="w-full py-2 px-4 focus:outline-none focus:ring focus:border-red"
                  placeholder="Enter Your Name *"
                  value={comment_author}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="my-4 border ">
                <input
                  type="email"
                  className="w-full py-2 px-4 focus:outline-none  border-none focus:ring focus:border-red"
                  placeholder="Enter Your Email *"
                  value={comment_author_email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-4 border ">
                <input
                  type="text"
                  className="w-full py-2 px-4 focus:outline-none focus:ring focus:border-red"
                  placeholder="Enter Your Website *"
                  value={comment_author_url}
                  required
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="my-4  ">
              <button
                type="submit"
                className=" uppercase   py-2  text-yellow-400"
                placeholder="Enter Your Website *"
              >
                Post A Comment
              </button>
            </div>
          </form>
        </div>
        <PostFooter />
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wpr/v1/posts`
  ).then();

  const data = await res.json();
  const paths = data.slice(0, 1).map((post) => {
    return {
      params: { slug: post.slug.toString() },
    };
  });
  return {
    paths,
    fallback: true,
    // paths:[{slug:}]
  };
};

export const getStaticProps = async (ctx) => {
  const slug = ctx.params !== undefined ? ctx.params.slug : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wpr/v1/post/${slug}`
  ).then();

  const postsData = await res.json();

  if (postsData.length === 0 || postsData === undefined) {
    return {
      props: {
        postsData,
        error: true,
      },
    };
  }
  return {
    props: {
      postsData: postsData,
      error: false,
    },
  };
};
