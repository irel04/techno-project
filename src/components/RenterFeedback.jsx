import { FaStar } from "react-icons/fa";

function RenterFeedback({ img, name, feedback }) {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <FaStar
        key={index}
        className="text-secondary text-2xl"
      />
    ));

  return (
    <div className="lg:w-[20rem] lg:h-[20rem] flex flex-col items-center justify-center gap-4 bg-white shadow-custom px-4 rounded">
      <img
        src={img}
        className="lg:w-[5rem] rounded-full"
      />
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p className="text-center">{feedback}</p>
      <div className="flex gap-2"> {stars}</div>
    </div>
  );
}

export default RenterFeedback;
