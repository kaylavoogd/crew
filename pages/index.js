import { NextSeo } from "next-seo";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import shuffle from "../utils/shuffle-image";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useCountDown from "../hooks/useCountDown";
import Founder from "../components/Home/Founder";
import dynamic from "next/dynamic";

// type Props = {
//   data: {
//     title: { rendered: string };
//     content: { rendered: string };
//     acf: {
//       profile_image_url: string;
//       first_section: string;
//       second_section: string;
//       third_section: string;
//       fourth_section: string;
//       value_first: {
//         image_: { sizes: { large: string }; url: string };
//         info: string;
//       };
//       value_second: {
//         image_: { sizes: { large: string }; url: string };
//         info: string;
//       };
//       value_third: {
//         image_: string;
//         info: string;
//       };
//       value_fourth: {
//         image_: { sizes: { large: string }; url: string };
//         info: string;
//       };
//       value_fifth: {
//         image_: { sizes: { large: string }; url: string };
//         info: string;
//       };
//     };
//   };
// };
const mspeaker = [
  { name: "Gary Vaynerchuk", itemsToShow: "Gary-Vaynerchuk-min.jpg" },
  { name: "Arianna Huffington", itemsToShow: "Arianna-Huffington-min.jpg" },
  { name: "Robert Kiyosaki", itemsToShow: "Robert-Kiyosaki.jpg" },
  { name: "Patrick Bet-David", itemsToShow: "Patrick-bet-david-min.jpg" },
  { name: "Tim Ferriss", itemsToShow: "Tim-Ferriss-min.png" },
  { name: "Tai Lopez", itemsToShow: "Tai-Lopez-min.jpg" },
];
export default function Home({ data }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { showReleaseDate, coundownText } = useCountDown("2021-12-05 8:00 AM");

  const animation = useAnimation();
  const firstImg = useAnimation();
  const secondImg = useAnimation();
  const thirdImg = useAnimation();
  const fourthImg = useAnimation();
  const slideLeft = useAnimation();
  const imagePath = [
    { src: "12.png", animation: secondImg },
    { src: "13.png", animation: firstImg },
    { src: "14.png", animation: fourthImg },
    { src: "335.png", animation: secondImg },
    { src: "slideshow/100.png", animation: thirdImg },
    { src: "slideshow/102.png", animation: thirdImg },
    { src: "slideshow/Cyndi Lauper Cheetah.png", animation: thirdImg },
    { src: "slideshow/Serena Williams Cheetah.png", animation: thirdImg },
    { src: "slideshow/Skylar Diggins-Smith Cheetah.png", animation: thirdImg },
    { src: "slideshow/Wonder Woman Cheetah.png", animation: thirdImg },
    { src: "slideshow/923.png", animation: thirdImg },
    { src: "slideshow/989.png", animation: thirdImg },
    { src: "slideshow/995.png", animation: thirdImg },
    { src: "slideshow/1014.png", animation: thirdImg },
    { src: "slideshow/1007.png", animation: thirdImg },
    { src: "slideshow/1017.png", animation: thirdImg },
    { src: "slideshow/105.png", animation: thirdImg },
    { src: "slideshow/107.png", animation: thirdImg },
    { src: "slideshow/108.png", animation: thirdImg },
    { src: "slideshow/109.png", animation: thirdImg },
    { src: "slideshow/110.png", animation: thirdImg },
    { src: "slideshow/112.png", animation: thirdImg },
    { src: "slideshow/124.png", animation: thirdImg },
    { src: "slideshow/139.png", animation: thirdImg },
    { src: "slideshow/140.png", animation: thirdImg },
    { src: "slideshow/92.png", animation: thirdImg },
    { src: "slideshow/93.png", animation: thirdImg },
    { src: "Damian lillard.png", animation: firstImg },
    { src: "james harden1.png", animation: secondImg },
    { src: "jazz 1.png", animation: thirdImg },
    { src: "Luke doncic.png", animation: fourthImg },
    { src: "MGK.png", animation: firstImg },
    { src: "pink panther.png", animation: secondImg },
    { src: "rapper 1.png", animation: thirdImg },
    { src: "snowbording cheetah.jpg", animation: fourthImg },
    { src: "Tom Brady 1.png", animation: firstImg },
    { src: "17.png", animation: firstImg },
    { src: "18.png", animation: secondImg },
    { src: "19.png", animation: secondImg },
    { src: "139.png", animation: secondImg },
    { src: "147.png", animation: secondImg },
    { src: "148.png", animation: secondImg },
    { src: "149.png", animation: secondImg },
    { src: "5521.png", animation: secondImg },
    { src: "569.png", animation: secondImg },
    { src: "520.png", animation: secondImg },
    { src: "335.png", animation: secondImg },
    { src: "162.png", animation: secondImg },
  ];

  const [shouldShowActions, setShouldShowActions] = useState(true);
  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration: 0.6 },
      });
      firstImg.start({
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration: 0.8 },
      });
      secondImg.start({
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration: 0.9 },
      });
      thirdImg.start({
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration: 1.2 },
      });
      fourthImg.start({
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration: 1.4 },
      });
      slideLeft.start({
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 1,
        transition: { duration: 1 },
      });
    }
    if (!inView) {
      animation.start({
        x: 0,
        y: 258,
        opacity: 0,
        zIndex: -1,

        transition: { duration: 1 },
      });
      firstImg.start({
        x: 0,
        y: 252,
        opacity: 0,
        zIndex: -1,
        transition: { duration: 1 },
      });
      secondImg.start({
        x: 0,
        y: 252,

        opacity: 0,
        zIndex: 1,
        transition: { duration: 1 },
      });
      thirdImg.start({
        x: 0,
        y: 252,

        opacity: 0,
        zIndex: 1,
        transition: { duration: 1 },
      });
      fourthImg.start({
        x: 0,
        y: 252,

        opacity: 0,
        zIndex: 1,
        transition: { duration: 1 },
      });

      slideLeft.start({
        x: 156,
        y: 0,
        opacity: 0,
        zIndex: 1,
        transition: { duration: 1 },
      });
    }
  }, [inView]);
  return (
    <>
      <NextSeo
        title={"Home - Coalitioncrew"}
        description="Youtube Twitter Instagram Welcome to the Coalition Mint here This is the NFT for Game Changers. The Coalition Crew is an exclusive collection of 7100 unique Cheetah NFTs living on the Ethereum blockchain. It’s estimated that as of 2021, there are only 7100 cheetahs left in the wild. Cheetahs are currently listed as vulnerable and &hellip; Home Read More &raquo;"
        openGraph={{
          description:
            "Youtube Twitter Instagram Welcome to the Coalition Mint here This is the NFT for Game Changers. The Coalition Crew is an exclusive collection of 7100 unique Cheetah NFTs living on the Ethereum blockchain. It’s estimated that as of 2021, there are only 7100 cheetahs left in the wild. Cheetahs are currently listed as vulnerable and &hellip; Home Read More &raquo;",
          title: "Home - Coalitioncrew",
          type: "website",
          locale: "en_US",
          url: process.env.NEXT_PUBLIC_DOMAIN,
          images: [
            {
              url: "http://coalitioncrew.com/wp-content/uploads/2021/10/TCC_1-Transparent-1024x982.png",
              width: 1200,
              height: 630,
              alt: "coalition crew logo",
            },
          ],
        }}
      />

      <main className="mx-auto">
        <div
          id="banner"
          className=" relative bg-crew w-full  h-screen bg-cover flex flex-col justify-between"
        >
          <Header />

          <div className="flex flex-col  md:absolute right-64 bottom-11   justify-center items-center">
            <button
              id="cta2"
              className="  text-3xl bg-yellow-300 uppercase italic font-bold  mb-2 px-16 py-4  text-iconColor"
            >
              Mint Here
            </button>

            <span className="text-2xl font-bold text-gray-800 mb-4">
              {showReleaseDate && coundownText}
            </span>
          </div>
        </div>

        <div className=" text-gray-800 ">
          <div className="post-content container mx-auto text-lg p-4 text-center md:text-left ">
            <div className="first-section">
              <h1 className="text-gray-900 text-left our-mission font-bold text-3xl border-b-2 pb-3 border-gray-800 md:w-1/4">
                Our Mission
              </h1>
              <section className="grid md:grid-cols-2 items-center">
                <div
                  className="about-mission"
                  dangerouslySetInnerHTML={{
                    __html: `${data.acf.first_section} ${data.acf.second_section}`,
                  }}
                ></div>
                <div className="flex items-center justify-center relative">
                  {" "}
                  <motion.div
                    initial={{ opacity: 0, height: "20rem", width: "20rem" }}
                    animate={{ opacity: 1, height: "22rem", width: "22rem" }}
                    className="h-72  duration-300 w-72 md:w-96 md:h-96 bg-gray-800 rounded-full absolute z-0 md:left-38"
                  ></motion.div>
                  <Image
                    alt={"logo"}
                    src={`/img/running-cheetah.gif`}
                    width={400}
                    className="relative"
                    objectFit="contain"
                    height={450}
                  />
                </div>
              </section>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-36 h-2 flex  bg-gray-700 my-9"></div>
          </div>

          <div
            ref={ref}
            className="gallery relative justify-items-center flex gap-8  md:grid-cols-4 "
          >
            {shuffle(imagePath).map((image, index) => (
              <motion.div
                className="item min-w-full rounded-lg"
                animate={image.animation}
                key={index}
              >
                <Image
                  alt={"Cheetah"}
                  src={"/img/" + image.src}
                  width={620}
                  height={650}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="max-w-6xl overflow-hidden w-36 h-2 flex mt-8  bg-gray-800 "></div>
          </div>
          <div
            id="banner2"
            className=" relative bg-value w-full  h-screen bg-cover flex flex-col justify-between "
          ></div>
          <div
            id="banner3"
            className=" relative bg-mentor w-full  h-screen bg-cover flex flex-col justify-between my-10"
          ></div>
          <div
            id="banner4"
            className=" relative bg-network1 w-full  h-screen bg-cover flex flex-col justify-between mb-10"
          ></div>
          <div
            id="banner5"
            className=" relative bg-network2 w-full  h-screen bg-cover flex flex-col justify-between mb-10"
          ></div>
          <div className="post-content container mx-auto text-lg p-4 text-center md:text-left ">
            <div className="first-section">
              <section
                className="fourth-section"
                // dangerouslySetInnerHTML={{ __html: data.acf.fourth_section }}
              >
                <div>
                  <p>
                    Once minted or bought on OpenSea, please fill out this{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.gamechangersmovemement.com/crew"
                      className="underline"
                    >
                      form
                    </a>{" "}
                    to get access to the Academy.
                    <br />
                    <span className="font-bold">Note!</span>
                    <br /> If you sell your only cheetah, your access to the
                    Academy will be suspended. You must own at least 1 to keep
                    access. <br /> After 3 months all holders will receive their
                    cheetah adoption “paperwork”. This includes a photo, an
                    adoption certificate, a stuffed animal, a species card +
                    more! <br /> We are launching a unique merchandise store for
                    Coalition Crew Members to make custom gear. <br /> All
                    holders get automatic WL for future projects, as well as
                    exclusive airdrops.
                  </p>
                </div>
              </section>
            </div>
            <Founder />
            <div className="h-0.5 w-full bg-gray-700 my-8"></div>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await fetch(`${NEXT_PUBLIC_BLOG_URL}/wp/v2/pages/4877`).then();
  const home = await data.json();

  return {
    props: {
      data: home,
    },
  };
};
