import { NextSeo } from "next-seo";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import shuffle from "../utils/shuffle-image";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { GetStaticProps } from "next";
// import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useCountDown from "../hooks/useCountDown";
import Founder from "../components/Home/Founder";
import dynamic from "next/dynamic";
import Web3 from "web3";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { contract_address, contract_abi, presale_price, phase1_tokenPrice, phase2_tokenPrice, speedy_nodes} from '../config';


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

  const[mintingcount, setmintingcount] = useState(1)
  const[totalAvailableSupply,settotalAvailableSupply] = useState('0')
  const[connectwallettext, setconnectwallettext] = useState('Connected Wallet');
  useEffect(() => {
    //connect_wallet()
    fetch_data()
  }, [])
  
  async function connect_wallet(){
    if(Web3.givenProvider){
      const providerOptions = {
        /* See Provider Options Section */
      };
      
      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });
      
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
  
      web3.eth.net.getId().then((result) => { 
      console.log("Network id: "+result);
      setconnectwallettext("Not Connected");
      if(result !== 1){
          alert("Wrong Network Selected. Select Ethereum Mainnet");
        } else {
         setconnectwallettext("Connected");
        }
      })
  
    }else{
      alert("Web3 Not Found. Try refreshing if you have metamask installed.");
    }
    return false;
  }
  async function fetch_data(){
  
    const web3 = new Web3(speedy_nodes);
    const contract = new web3.eth.Contract(contract_abi, contract_address);
    //await Web3.givenProvider.enable()
  
    contract.methods.totalSupply().call((err,result) => {
        console.log("error: "+err);
      console.log('totalSupply result : ', result);
        if(result != null){
            settotalAvailableSupply(result)
        }
    })
  
  }
  async function show_error_alert(error){
    let temp_error = error.message.toString();
    console.log('temp_error', temp_error);
    let error_list = [
      "It's not time yet",
      "Sent Amount Wrong",
      "Max Supply Reached",
      "You have already Claimed Free Nft.",
      "Presale have not started yet.",
      "Presale Ended.",
      "You are not Whitelisted.",
      "Sent Amount Not Enough",
      "Max 20 Allowed.",
      "insufficient funds",
      "mint at least one token",
      "Max 3 Nfts Per Transaction Allowed.",
      "Not enough tokens left",
      "incorrect ether amount",
      "Presale have not started yet.",
      "Presale Ended.",
      "Sale is Paused.",,
      "You are not whitelisted.",
      "Max 3 Nft Per Wallet Allowed.",
      "Whitelist is not active",
    ]
  
    let foundError = false;
    for(let i=0;i<error_list.length;i++){
      if(temp_error.includes(error_list[i])){
       // set ("Transcation Failed")
        foundError = true;
        alert(error_list[i]);
      }
    }
    
    if(!foundError) {
      alert(temp_error);
    }
  }
  function mint_nft(){
    let phase2_startTime = 1638817331;    
    let phase1_startTime = 1638813600;
    let presale_startTime = 1638640800; 
  console.log(mintingcount);
    let current_time = Math.floor(Date.now() / 1000);
  // presale
    
    mint();
  }
    async function presale(){
  
    if(Web3.givenProvider ){ 
      
      await connect_wallet();
      
      if(connectwallettext !== 'Connected') {
        return;
      }
  
      console.log('connectwallettext', connectwallettext);
      
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable()
      const contract = new web3.eth.Contract(contract_abi, contract_address);
  
      const addresses = await web3.eth.getAccounts()
      const address = addresses[0]
      console.log("addresses[0]: "+addresses[0])
      // console.log("addresses[1]: "+addresses[1])
      // console.log("Default address: "+await web3.eth.defaultAccount)
  
      let price = presale_price * parseInt(mintingcount);
      price = Math.round(price * 100) / 100;
      console.log('price', price);
      
      
      
      try{
        const estemated_Gas = await contract.methods.presale(mintingcount.toString()).estimateGas({
          from : address, 
          value: web3.utils.toWei(price.toString(),"ether"),
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        });
        console.log(estemated_Gas)
        const result = await contract.methods.presale(mintingcount.toString()).send({
          from : address,
          value: web3.utils.toWei(price.toString(),"ether"),
          gas: estemated_Gas,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        })
      }catch(e){
        show_error_alert(e);
      }
  
     // await contract.methods.tokenByIndex(i).call();
    }else{
      alert("Web3 Not Found. Try refreshing if you have metamask installed.");
    }
  
  }
  async function mint(){
  
    if(Web3.givenProvider ){ 
      
      await connect_wallet();
      
      if(connectwallettext !== 'Connected') {
        return;
      }  
  
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable()
      const contract = new web3.eth.Contract(contract_abi, contract_address);
  
      const addresses = await web3.eth.getAccounts()
      const address = addresses[0]
      console.log("addresses[0]: "+addresses[0])
      // console.log("addresses[1]: "+addresses[1])
      // console.log("Default address: "+await web3.eth.defaultAccount)
  
      let price = phase1_tokenPrice * parseInt(mintingcount);
      price = Math.round(price * 100) / 100;
      
      console.log('price', price);
      
      try{
        const estemated_Gas = await contract.methods.mint(mintingcount.toString()).estimateGas({
          from : address, 
          value: web3.utils.toWei(price.toString(),"ether"),
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        });
        console.log(estemated_Gas)
        const result = await contract.methods.mint(mintingcount.toString()).send({
          from : address,
          value: web3.utils.toWei(price.toString(),"ether"),
          gas: estemated_Gas,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        })
      }catch(e){
        show_error_alert(e);
      }
  
     // await contract.methods.tokenByIndex(i).call();
    }else{
      alert("Web3 Not Found. Try refreshing if you have metamask installed.");
    }
  
  }
  async function buy_phase2(){
  
    if(Web3.givenProvider ){ 
  
      const web3 = new Web3(Web3.givenProvider);
      await Web3.givenProvider.enable()
      const contract = new web3.eth.Contract(contract_abi, contract_address);
  
      const addresses = await web3.eth.getAccounts()
      const address = addresses[0]
      console.log("addresses[0]: "+addresses[0])
      // console.log("addresses[1]: "+addresses[1])
      // console.log("Default address: "+await web3.eth.defaultAccount)
  
      let price = phase2_tokenPrice * parseInt(mintingcount);
      price = Math.round(price * 100) / 100;
  
      try{
        const estemated_Gas = await contract.methods.buy_phase2(mintingcount.toString()).estimateGas({
          from : address, 
          value: web3.utils.toWei(price.toString(),"ether"),
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        });
        console.log(estemated_Gas)
        const result = await contract.methods.buy_phase2(mintingcount.toString()).send({
          from : address,
          value: web3.utils.toWei(price.toString(),"ether"),
          gas: estemated_Gas,
          maxPriorityFeePerGas: null,
          maxFeePerGas: null
        })
      }catch(e){
        show_error_alert(e);
      }
  
     // await contract.methods.tokenByIndex(i).call();
    }else{
      alert("Web3 Not Found. Try refreshing if you have metamask installed.");
    }
  
  }


  const { ref, inView } = useInView({ threshold: 0.2 });
  const { showReleaseDate, coundownText } = useCountDown("2021-12-04 10:00 AM");

  const animation = useAnimation();
  const firstImg = useAnimation();
  const secondImg = useAnimation();
  const thirdImg = useAnimation();
  const fourthImg = useAnimation();
  const slideLeft = useAnimation();
  const imagePath = [
    { src: "slideshow/boxer 2.png", animation: secondImg },
    { src: "slideshow/boxer.png", animation: firstImg },
    { src: "slideshow/dennis-3.png", animation: fourthImg },
    { src: "slideshow/diver.png", animation: secondImg },
    { src: "slideshow/mobster.png", animation: thirdImg },
    { src: "slideshow/pilot.png", animation: thirdImg },
    { src: "slideshow/pirates cheetah.png", animation: thirdImg },
    { src: "slideshow/russell.png", animation: thirdImg },
    { src: "slideshow/surfer-2.png", animation: thirdImg },
    { src: "slideshow/tiger woods.png", animation: thirdImg },
    { src: "slideshow/zombie cheetah.png", animation: thirdImg },
    // { src: "slideshow/989.png", animation: thirdImg },
    // { src: "slideshow/995.png", animation: thirdImg },
    // { src: "slideshow/1014.png", animation: thirdImg },
    // { src: "slideshow/1007.png", animation: thirdImg },
    // { src: "slideshow/1017.png", animation: thirdImg },
    // { src: "slideshow/105.png", animation: thirdImg },
    // { src: "slideshow/107.png", animation: thirdImg },
    // { src: "slideshow/108.png", animation: thirdImg },
    // { src: "slideshow/109.png", animation: thirdImg },
    // { src: "slideshow/110.png", animation: thirdImg },
    // { src: "slideshow/112.png", animation: thirdImg },
    // { src: "slideshow/124.png", animation: thirdImg },
    // { src: "slideshow/139.png", animation: thirdImg },
    // { src: "slideshow/140.png", animation: thirdImg },
    // { src: "slideshow/92.png", animation: thirdImg },
    // { src: "slideshow/93.png", animation: thirdImg },
    // { src: "slideshow/1.gif", animation: firstImg },
    // { src: "slideshow/2.gif", animation: secondImg },
     { src: "slideshow/3.png", animation: thirdImg },
     { src: "slideshow/4.png", animation: fourthImg },
     { src: "slideshow/5.png", animation: firstImg },
     { src: "slideshow/6.png", animation: secondImg },
     { src: "slideshow/7.png", animation: thirdImg },
     { src: "slideshow/8.png", animation: fourthImg },
     { src: "slideshow/9.png", animation: firstImg },
     { src: "slideshow/10.jpeg", animation: firstImg },
     { src: "slideshow/11.png", animation: secondImg },
    // { src: "19.png", animation: secondImg },
    // { src: "139.png", animation: secondImg },
    // { src: "147.png", animation: secondImg },
    // { src: "148.png", animation: secondImg },
    // { src: "149.png", animation: secondImg },
    // { src: "5521.png", animation: secondImg },
    // { src: "569.png", animation: secondImg },
    // { src: "520.png", animation: secondImg },
    // { src: "335.png", animation: secondImg },
    // { src: "162.png", animation: secondImg },
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
            {/* {(connectwallettext !== 'Connected') && (<button
            onClick={mint_nft}
              id="cta2"
              className="  text-3xl bg-yellow-300 uppercase italic font-bold  mb-2 px-16 py-4  text-iconColor"
            >
              CONNECT WALLET
            </button>)}  */}
          <button
              id="cta2"
              className="  text-3xl bg-yellow-300 uppercase italic font-bold  mb-2 px-16 py-4  text-iconColor"
            >
              SOLD OUT
            </button>
          {(connectwallettext === 'Connected') && (
            <>
              <select onChange={e => {setmintingcount(e.currentTarget.value); }} className="text-1xl bg-yellow-300 uppercase italic font-bold  mb-2 px-16 py-4  text-iconColor">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>

                      </select>

                                               
              <button
              onClick={mint_nft}
                id="cta2"
                className="  text-3xl bg-yellow-300 uppercase italic font-bold  mb-2 px-16 py-4  text-iconColor"
              >
                Mint Here
              </button>
              <p className="date-text">Jan 26th 10am PST/1pm EST</p>
              <span className="text-2xl font-bold text-gray-800 mb-1">
                Total Minted: {totalAvailableSupply} / 3974
              </span>
              <span className="text-2xl font-bold text-gray-800 mb-4">
                {showReleaseDate && coundownText}
              </span>
            </>
          )}
          
          </div>
        </div>

        <div className=" text-gray-800 ">
          <div className="post-content container mx-auto text-lg p-4 text-center md:text-left ">
            <div className="first-section">
              <h1 className="text-gray-900 text-left our-mission font-bold text-3xl border-b-2 pb-3 border-gray-800 md:w-1/4">
                Our Mission
              </h1>
              <section className="grid md:grid-cols-2 items-center">
                <div className="about-mission">
                  <p>
                      Welcome to The Coalition Crew 🐆. The NFT for Game Changers, and
                      those looking to elevate their network while making a global
                      impact. What makes this project unique is the collective
                      intelligence of our community. The utility of the Game Changers
                      Academy, and the ability to contribute to saving wild cheetahs
                      from extinction. Our mission is to give people the resources,
                      network, and guidance they need to truly build a life and
                      business on THEIR TERMS.
                  </p>
                  <p>
                      This project is technically broken up into three unique
                      collections
                  </p>
                  <p>
                      The Coalition Crew (OG COLLECTION) Only 1010 avail. These Sold
                      out in less than a day and the Floor price has already 10Xd!
                  </p>
                  <p>
                      Opensea:{" "}
                      <a
                          href="https://opensea.io/collection/coalitioncrew"
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: 'underline' }}
                      >
                          https://opensea.io/collection/coalitioncrew
                      </a>
                  </p>
                  <p>
                      The Legendary Auction Cheetahs. 20 avail. The average sale price
                      was 1.5 ETH and this was the #1 trending collection on Opensea.
                  </p>
                  <p>
                      Opensea: {" "}
                      <a
                          href="https://opensea.io/collection/coalitioncrewauction"
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: 'underline' }}
                      >
                          https://opensea.io/collection/coalitioncrewauction
                      </a>
                  </p>
                  <p>
                      Coalition Crew 2.0 - Only 3970 avail. These sold out in less
                      than a day and the Floor doubled within a couple of days.
                  </p>
                  <p>
                      Opensea: {" "}
                      <a
                          href="https://opensea.io/collection/coalition-crew-2-0"
                          target="_blank"
                          rel="noreferrer"
                          style={{ textDecoration: 'underline' }}
                      >
                          https://opensea.io/collection/coalition-crew-2-0
                      </a>
                  </p>
                  <p>
                      The Coalition Crew has NBA players, NFL Pro-bowlers, MLB
                      players, Olympians, Crypto Whales, Entertainers, Celebrities,
                      and Big Investors who have organically joined their project.
                  </p>
                  <p>
                      This is a unique opportunity to get in on the ground floor of a
                      very promising and proven project. If you have ever thought about
                      getting into NFTs this would be the one to get into. This is for
                      those wanting to make a real impact while being connected to an
                      elite society of true Game-changers.
                  </p>
                </div>
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
          <div className="flex flex-col  right-64 bottom-11   justify-center items-center">
            <button id="cta2" className=" roadmap  text-3xl bg-yellow-300 uppercase italic font-bold  mb-2 px-16 py-4  text-iconColor">
              <a target="_blank" href="https://drive.google.com/file/d/1irwEOmp1Ytzrvb3jKKf7KL00o4r_5ZpE/view" rel="noreferrer">The Roadmap</a>
            </button>
            <span className="text-2xl font-bold text-gray-800 mb-4"></span>
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
                      href="https://www.gamechangersmovement.com/crew"
                      rel="noreferrer"
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
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp/v2/pages/4877`
  ).then();
  const home = await data.json();

  return {
    props: {
      data: home,
    },
  };
};
