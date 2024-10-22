import HomeTitle from "../components/HomeTitle";
import Dorm from "../components/Dorm";
import dormImg from "../assets/dorm.jpg";
import how1 from "../assets/how1.png";
import how2 from "../assets/how2.png";
import how3 from "../assets/how3.png";

import welcomeImg from "../assets/design.png";

import Button from "../components/Button";
import RenterFeedback from "../components/RenterFeedback";
import Input from "../components/Input";
import SearchBar from "../components/SearchBar";
import Select from "../components/Select";
import HowItWorks from "../components/HowItWorks";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import DormListSkeleton from "../components/skeletons/DormListSkeleton";
import { useAuth } from "../hooks/useAuth";

const howItWorks = [
  {
    img: how1,
    number: "01",
    title: "Search for Your Ideal Dorm",
    description:
      "Use our easy-to-navigate website to browse through a wide range of dormitories and student housing options in Metro Manila. Filter your search by location, price, and amenities to find the perfect fit.",
  },
  {
    img: how2,
    number: "02",
    title: "Review Dorm Listings",
    description:
      "Explore detailed listings that have been reviewed and verified to ensure accuracy and quality. Each listing provides comprehensive information, including photos, descriptions, and reviews from other students.",
  },
  {
    img: how3,
    number: "03",
    title: "Contact and Book",
    description:
      "Once you’ve found the ideal dorm, reach out to the property owner or manager directly through our platform to ask questions, schedule a visit, or make a booking. Enjoy a smooth and hassle-free process from start to finish.",
  },
];

const options = [
  "Php 1000 - 1500",
  "Php 1000 - 1500",
  "Php 1000 - 1500",
  "Php 1000 - 1500",
];

function Home() {
  const navigate = useNavigate();
  const navigateToRegister = () => navigate("/account");
  const navigateToAbout = () => navigate("/about");
  const [dormsData, setDormsData] = useState(null);
  const [rentersFeedback, setRentersFeedback] = useState([]);


  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const { data: dorms, error: dormError } = await supabase.from(
          "properties",
        ).select(`
          id,
          dorm_name,
          provider : lease_providers (
            last_name,
            first_name,
            isVerified
          ),
          rates: rent_rates(
            from
          ),
          cover_photo,
          ratings,
          location: addresses_property(
            province,
            city,
            barangay,
            street,
            longitude,
            latitude
          )
            `).eq("is_active", true);

        if (dormError) {
          throw dormError;
        }
        const verifiedDorms = dorms.filter((dorm) => dorm.provider.isVerified);

        setDormsData(
          verifiedDorms.map((dorm) => {
            const { street, barangay, city, province } = dorm.location;
            const { last_name, first_name } = dorm.provider;
            const { isVerified } = dorm.provider;

            return {
              img: dorm.cover_photo,
              dormName: dorm.dorm_name,
              location: `${city}, ${province}`,
              ownerName: `${first_name} ${last_name}`,
              price: dorm.rates.from,
              rating: dorm.ratings,
              isVerified: isVerified,
              link: `/dorm/${dorm.id}`,
            };
          }),
        );
      } catch (error) {
        console.error(error);
        setDormsData([]);
      }
    };
    //-------------------------------------------------------------------------------------
    const fetchRentersFeedback = async () => {
      try {
        const { data: feedback, error: feedbackError } = await supabase.from(
          "renter_site_review",
        ).select(`
            site_review,
            site_ratings,
            renter: renters (
              first_name,
              last_name,
             
              profile_photo
            )
          `);

        if (feedbackError) {
          throw feedbackError;
        }

        setRentersFeedback(
          feedback.map((item) => ({
            img: item.renter.profile_photo,
            rating: item.site_ratings,
            name: `${item.renter.first_name} ${item.renter.last_name}`,
            feedback: item.site_review,
          })),
        );
      } catch (error) {
        console.error(error);
        setRentersFeedback([]);
      }
    };

    fetchDorms();
    fetchRentersFeedback();
  }, []);

  return (
    <main className="flex flex-col gap-[5rem] lg:gap-[10rem] items-center justify-center mt-[3rem] mb-[3rem] md:mt-[5rem] md:mb-[10rem] overflow-x-hidden">
      {/* Search */}
      <section className="flex flex-col gap-10 items-center justify-center w-full">
        <div className="bg-white shadow-custom flex flex-col gap-2 p-5 w-full max-w-[60rem]">
          <h1 className="text-2xl lg:text-4xl font-bold text-primary">
            Find Your Dorm Now
          </h1>
          <p>
            Find affordable dormitories that are conveniently located near your
            school.
          </p>
          <div className="flex flex-col md:flex-row gap-8">
            <SearchBar />
            <Select options={options} />
            <Button
              color="primary"
              className="px-5"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="w-full flex flex-col gap-10 items-center justify-center">
        <HomeTitle title="Featured Properties in DormFinder.PH" />
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {dormsData ? (
            dormsData.length ? (
              dormsData.map((dorm, index) => (
                <li key={index}>
                  <Dorm
                    img={dorm.img}
                    dormName={dorm.dormName}
                    location={dorm.location}
                    ownerName={dorm.ownerName}
                    price={dorm.price}
                    rating={dorm.rating}
                    link={dorm.link}
                    isVerfied={dorm.isVerified}
                  />
                </li>
              ))
            ) : (
              <p>No posts yet...</p>
            )
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <DormListSkeleton key={index} />
            ))
          )}
        </ul>
      </section>

      {/* Welcome Message */}
      <section className="flex flex-col gap-10 items-center justify-center">
        <HomeTitle title="Dorms for Rent in the Metro Manila, Philippines" />
        <p className="font-semibold  text-xl">Welcome to DormFinder.PH</p>
        <p className="text-center">
          Welcome to DormFinder.ph! Your go-to site for finding top-notch
          student dormitories and housing across Metro Manila. We offer a
          variety of rental options, from shared rooms to individual units,
          ensuring you find the perfect fit for your needs. Our commitment to
          quality means most of our listings are thoroughly reviewed and
          verified, and we're working towards 100% verification. Best of luck in
          your search for student accommodation, and don't hesitate to contact
          us with any rental inquiries. Happy searching!
        </p>
      </section>

      <section className="-mt-[5rem] w-screen max-w-screen flex justify-center items-baseline">
        <div className="bg-primary w-full h-[6rem] md:h-[10rem]"></div>

        <img
          src={welcomeImg}
          className="h-[15rem] md:h-[25rem] align-middle"
        />
        <div className="bg-primary w-full h-[6rem]  md:h-[10rem]"></div>
      </section>

      {/* How it works */}
      <section className="flex flex-col gap-10 items-center justify-center">
        <HomeTitle title="How It Works" />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10">
          {howItWorks.map((howItWorks, index) => (
            <li key={index}>
              <HowItWorks
                img={howItWorks.img}
                number={howItWorks.number}
                title={howItWorks.title}
                description={howItWorks.description}
              />
            </li>
          ))}
        </ul>

        {isAuthenticated ? null : <Button
          className="max-w-fit px-5"
          color="primary"
          onClick={navigateToRegister}
        >
          Register Now
        </Button>}
      </section>

      {/* Why Join Us */}
      <section className="flex flex-col md:flex-row gap-10 items-center justify-center xl:mx-[10rem]">
        <img
          src={dormImg}
          className="rounded md:max-w-[20rem] md:max-h-[20rem]  lg:max-w-[30rem] lg:max-h-[30rem] object-cover"
        />
        <div className="items-center flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold text-center md:text-left">
            Use DormFinder.PH to find the best dorm for your needs
          </h1>
          <p className="text-center md:text-left">
            Whether finding the right dorm when college comes, a bed space while
            exploring the first job, or an apartment while saving for that dream
            house for your growing family, we provide options offering monthly
            to long-term stays giving you convenience in quickly accessing vast
            choices.
          </p>
          <Button
            color="primary"
            className="max-w-fit px-5"
            onClick={navigateToAbout}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Renters Feedback */}
      <section className="flex flex-col gap-10 items-center justify-center">
        <HomeTitle title="What Our Renters Say" />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rentersFeedback.map((feedback, index) => (
            <li key={index}>
              <RenterFeedback
                img={feedback.img}
                name={feedback.name}
                feedback={feedback.feedback}
                rating={parseInt(feedback.rating)}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;
