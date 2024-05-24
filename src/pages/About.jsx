import React from "react";
import aboutImg from "../assets/about.png";
import sample from "../assets/about.png";

import logo from "../assets/logo.png";
import AboutCard from "../components/AboutCard";
import Button from "../components/Button";

const about = [
  {
    bannerImg: sample,
    logoImg: logo,
    description:
      "Connecting renters with rentals and roommates for hassle-free student accommodations in Metro Manila.",
    button: <Button color="primary">Search for Dorms</Button>,
  },
  {
    bannerImg: sample,
    logoImg: logo,
    description:
      "Simplifying rental lead generation and management for landlords in Metro Manila's student housing market.",
    button: <Button color="primary">Search for Dorms</Button>,
  },
  {
    bannerImg: sample,
    logoImg: logo,
    description:
      "Premium subscriptions boost visibility and lead generation for landlords in Metro Manila's student housing market.",
    button: <Button color="primary">Search for Dorms</Button>,
  },
];

function About() {
  return (
    <main className="flex flex-col gap-[5rem] lg:gap-[10rem] lg:mb-[10rem] my-[3rem] lg:mt-[5rem]">
      {/* What is DormFinder */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-[3rem] lg:gap-[5rem]">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">
            What is{" "}
            <span className="text-primary font-extrabold">DormFinder.PH</span>?
          </h1>
          <p className="text-xl">
            <span className="font-bold">DormFinder.PH</span> is an online
            platform connecting students with high-quality dormitories and
            student housing in Metro Manila. With verified listings and a
            user-friendly interface, it simplifies the search for the perfect
            student accommodation.
          </p>
        </div>
        <img
          src={aboutImg}
          className="w-full md:max-w-[20rem] lg:max-w-[30rem] xl:max-w-[50rem] max-h-[30rem] object-cover"
        />
      </section>

      {/* Our Goal */}
      <section className="flex flex-col items-center justify-between gap-5 ">
        <h2 className="uppercase font-semibold">Our Goals</h2>
        <h1 className="text-center md:text-left text-5xl font-bold">
          Make dorm finding better, for everyone
        </h1>
        <p className="text-center md:text-left text-2xl">
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
