function AboutCard({ bannerImg, logoImg, description, button }) {
  return (
    <div className="bg-white shadow-custom lg:w-[20rem] lg:h-[20rem]">
      <img
        className="h-[10rem] w-full"
        src={bannerImg}
      />
      <div className="p-3 flex items-center justify-between gap-5">
        <img
          className="h-[3rem]"
          src={logoImg}
        />
        <p>{description}</p>
      </div>
      <div className="p-2"> {button}</div>
    </div>
  );
}

export default AboutCard;
