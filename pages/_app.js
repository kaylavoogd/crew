import { AnimatePresence } from "framer-motion";

import "../styles/wp.css";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

// import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <DefaultSeo
        key="seo"
        title="Coalitioncrew"
        titleTemplate="%s | Coalitioncrew"
        description="Youtube Twitter Instagram Welcome to the Coalition Mint here This is the NFT for Game Changers. The Coalition Crew is an exclusive collection of 7100 unique Cheetah NFTs living on the Ethereum blockchain. It’s estimated that as of 2021, there are only 7100 cheetahs left in the wild. Cheetahs are currently listed as vulnerable and &hellip; Home Read More &raquo;"
        canonical={process.env.NEXT_PUBLIC_DOMAIN}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: process.env.NEXT_PUBLIC_DOMAIN,
          title: "Coalitioncrew",
          description:
            "Youtube Twitter Instagram Welcome to the Coalition Mint here This is the NFT for Game Changers. The Coalition Crew is an exclusive collection of 7100 unique Cheetah NFTs living on the Ethereum blockchain. It’s estimated that as of 2021, there are only 7100 cheetahs left in the wild. Cheetahs are currently listed as vulnerable and &hellip; Home Read More &raquo;",
        }}
      />

      <Component {...pageProps} />
    </AnimatePresence>
  );
}
export default MyApp;
