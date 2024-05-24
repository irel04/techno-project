function AboutCard({ bannerImg, logoImg, description, button }) {
  return (
    <div className="bg-white shadow-custom lg:w-[20rem] ">
      <img
        className="h-[10rem] w-full object-cover"
        src={bannerImg}
      />

      <p className="p-2 text-center">{description}</p>

      <div className="p-2"> {button}</div>
    </div>
  );
}

export default AboutCard;
