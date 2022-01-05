export default function Value() {
  return (
    <section className="grid grid-cols-2 my-8 value-section">
      <div className="border-8 border-brownBorder font-bold ">
        <div className="  text-yellow-200 w-1/2  font-extrabold py-2 px-4 bg-brownBackground value-header">
          <span className="   w-full flex items-center gap-2">
            <span className="w-2 h-2 block bg-white rounded-full "></span>
            GROWING IN VALUE :
          </span>
        </div>
        <p className="px-4">
          All Holders Will Get Exclusive Access to the Forbes featured Game
          Changers Academy. This is the {`World's`} Most Elite and Top Rated
          Networking and Entrepreneurial Community
        </p>
        <div className="px-4 flex gap-1 items-center my-4">
          Which Will Include
          <div className="flex relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 font-bold text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M19 9l-7 7-7-7"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 absolute top-2 font-bold text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
