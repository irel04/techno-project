import React from "react";
import sample from "../assets/sample.jpeg";
import logo from "../assets/logo.png";
import AboutCard from "../components/AboutCard";
import Button from "../components/Button";

const about = [
  {
    bannerImg: sample,
    logoImg: logo,
    description:
      "An online listings platform connecting renters with rentals and roommates.",
    button: <Button color="primary">Search for Dorms</Button>,
  },
  {
    bannerImg: sample,
    logoImg: logo,
    description:
      "An online listings platform connecting renters with rentals and roommates.",
    button: <Button color="primary">Search for Dorms</Button>,
  },
  {
    bannerImg: sample,
    logoImg: logo,
    description:
      "An online listings platform connecting renters with rentals and roommates.",
    button: <Button color="primary">Search for Dorms</Button>,
  },
];

function About() {
  return (
    <main className="flex flex-col lg:gap-[10rem] lg:mb-[10rem] lg:mt-[5rem]">
      {/* What is DormFinder */}
      <section className="flex flex-col md:flex-row items-center justify-between lg:gap-[5rem]">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">
            What is{" "}
            <span className="text-primary font-extrabold">DormFinder.PH</span>?
          </h1>
          <p className="text-xl">
            <span className="font-bold">DormFinder.PH</span> is a marketplace
            for residential stays, where renters can easily find residential
            spaces for rent in one platform.
          </p>
        </div>
        <img
          src={sample}
          className=""
        />
      </section>

      {/* Our Goal */}
      <section className="flex flex-col items-center justify-between gap-5 ">
        <h2 className="uppercase">Our Goals</h2>
        <h1 className="text-5xl font-bold">
          Make dorm finding better, for everyone
        </h1>
        <p className="text-2xl">
          We're revolutionizing the way people rent, by paving the path towards
          a tech-enabled rental ecosystem for all.
        </p>
        <p className="text-xl italic">Explore our initiatives below 👇</p>

        <ul className="flex flex-col gap-10 md:flex-row">
          {about.map((about, index) => (
            <li key={index}>
              <AboutCard
                bannerImg={about.bannerImg}
                logoImg={about.logoImg}
                description={about.description}
                button={about.button}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default About;
