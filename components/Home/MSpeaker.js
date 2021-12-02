import Image from "next/image";
export default function MSpeaker() {
  const mspeaker = [
    { name: "Gary Vaynerchuk", itemsToShow: "Gary-Vaynerchuk-min.jpg" },
    { name: "Arianna Huffington", itemsToShow: "Arianna-Huffington-min.jpg" },
    { name: "Robert Kiyosaki", itemsToShow: "Robert-Kiyosaki.jpg" },
    { name: "Patrick Bet-David", itemsToShow: "Patrick-bet-david-min.jpg" },
    { name: "Tim Ferriss", itemsToShow: "Tim-Ferriss-min.png" },
    { name: "Tai Lopez", itemsToShow: "Tai-Lopez-min.jpg" },
  ];
  return (
    // <div className="grid grid-cols-2 ">
    //   <section className="comment-box font-bold flex items-center justify-center">
    //     Imagine getting <br /> mentored by some <br /> of the world's most{" "}
    //     <br /> elite and successful <br /> entrepreneurs, <br />
    //     CEOs and leaders.
    //   </section>
    //   <section>
    //     <h3 className="uppercase font-bold font-sans my-2">
    //       Monthly Millionaire Guest Speakers
    //     </h3>

    //     <div className="grid grid-cols-4">
    //       {mspeaker.map((item, index) => (
    //         <div className="m-1">
    //           {/* <img alt={item.name} src={"/img/" + item.itemsToShow} /> */}
    //           <Image
    //             alt={item.name}
    //             src={"/img/" + item.itemsToShow}
    //             objectFit="contain"
    //             width={100}
    //             height={100}
    //             className="rounded-md"
    //           />
    //           <span className="mspeaker-name  font-bold block">
    //             {item.name}
    //           </span>
    //         </div>
    //       ))}
    //     </div>
    //   </section>
    // </div>
    <>
      <Image
        src="/img/GCA-November-Millionaire-Guest-Speaker-Graphic.svg"
        width={1024}
        height={600}
        alt="speakers"
      />
    </>
  );
}
