function HowItWorks({ img, number, title, description }) {
  return (
    <div className="flex flex-col gap-2 w-full md:max-w-[25rem]">
      <div className="flex gap-10 justify-center items-center md:justify-between">
        <img
          src={img}
          className="max-h-[10rem]"
        />
        <h1 className="text-[5rem] font-extrabold text-primary">{number}</h1>
      </div>
      <h1 className="text-center md:text-left text-2xl font-bold">{title}</h1>
      <p className="text-center md:text-left">{description}</p>
    </div>
  );
}

export default HowItWorks;
