function HowItWorks({ img, number, title, description }) {
  return (
    <div className="flex flex-col gap-2 lg:w-[22rem]">
      <div className="flex gap-3 items-center justify-between">
        <img
          src={img}
          className="lg:h-[10rem]"
        />
        <h1 className="text-[5rem] font-extrabold text-primary">{number}</h1>
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="">{description}</p>
    </div>
  );
}

export default HowItWorks;
