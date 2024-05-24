import { FaStar } from "react-icons/fa";

function RenterFeedback({ img, name, feedback }) {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <FaStar
        key={index}
        className="text-secondary text-xl md:text-2xl"
      />
    ));

  return (
    <div className="w-full lg:w-[25rem] max-h-[20rem] flex flex-col items-center justify-center gap-4 bg-white shadow-custom p-4 rounded">
      <img
        src={img}
        className="w-[5rem] h-[5rem] rounded-full"
      />
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p className="text-center">{feedback}</p>
      <div className="flex gap-2"> {stars}</div>
    </div>
  );
}

export default RenterFeedback;
