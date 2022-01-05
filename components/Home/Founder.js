import Image from "next/image";
export default function Founder() {
  return (
    <div className="flex items-center md:flex-row sm:flex-col flex-col-reverse">
      <div className="flex-1 ">
        <h4 className=" underline text-3xl">Meet the Founders:</h4>
        <p>
          {" "}
          <a
            className="underline text-xl font-semibold"
            href="https://www.instagram.com/peterjvoogd"
            target="_blank"
            rel="noreferrer"
          >
            Peter
          </a>{" "}
          &{" "}
          <a
            className="underline  text-xl font-semibold"
            href="https://www.instagram.com/kaylavoogd"
            target="_blank"
            rel="noreferrer"
          >
            Kayla Voogd
          </a>{" "}
        </p>
        <p>
          They are the founders of the Forbes featured Game Changers Academy{" "}
          <br /> ({" "}
          <a
            href="https://GameChangersMovement.com"
            target="_blank"
            rel="noreferrer"
          >
            GameChangersMovement.com
          </a>{" "}
          ), which was created in 2013. They both have a deep passion for
          animals and for helping people, which is why the Coalition Crew is
          focused on both.
        </p>
        <p>
          They want to pave a new way in the NFT space by giving back to the
          world, and by bringing utility that helps people become the best
          versions of themselves while also donating a portion of each sale to
          World Wildlife Foundation.
        </p>
        <p>They have two amazing kids, Santana and Siena.</p>
        <p>
          You can can learn more at{" "}
          <a
            className="underline"
            href="https://PeterJVoogd.com"
            target="_blank"
            rel="noreferrer"
          >
            PeterJVoogd.com.
          </a>
        </p>
      </div>
      <div className="flex-1 p-10 mx-auto text-center">
        <Image
          src="/img/profile.jpeg"
          objectFit="cover"
          objectPosition="center"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
