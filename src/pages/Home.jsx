import HomeTitle from "../components/HomeTitle";
import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import HowItWorks from "../components/HowItWorks";
import Button from "../components/Button";
import RenterFeedback from "../components/RenterFeedback";
import Input from "../components/Input";
import SearchBar from "../components/SearchBar";
import Select from "../components/Select";

const dorms = [
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
  },
];

const howItWorks = [
  {
    img: img,
    number: "01",
    title: "Search Nearby",
    description:
      "Looking for a small room you can rent out near your workplace? or perhaps you’re looking to rent out an apartment for your growing family?",
  },
  {
    img: img,
    number: "01",
    title: "Search Nearby",
    description:
      "Looking for a small room you can rent out near your workplace? or perhaps you’re looking to rent out an apartment for your growing family?",
  },
  {
    img: img,
    number: "01",
    title: "Search Nearby",
    description:
      "Looking for a small room you can rent out near your workplace? or perhaps you’re looking to rent out an apartment for your growing family?",
  },
];

const rentersFeedback = [
  {
    img: img,
    name: "Juan Dela Cruz",
    feedback:
      "I recently had the pleasure of staying in a small room at this lovely hotel, and I must say it was a delightful experience.",
  },
  {
    img: img,
    name: "Juan Dela Cruz",
    feedback:
      "I recently had the pleasure of staying in a small room at this lovely hotel, and I must say it was a delightful experience.",
  },
  {
    img: img,
    name: "Juan Dela Cruz",
    feedback:
      "I recently had the pleasure of staying in a small room at this lovely hotel, and I must say it was a delightful experience.",
  },
];

function Home() {
  return (
    <main className="flex flex-col gap-[5rem] lg:gap-[10rem] items-center justify-center">
      {/* Search */}
      <section className="flex flex-col gap-10 items-center justify-center mt-[2rem] lg:mt-[5rem]">
        <div className="bg-white shadow-custom flex flex-col gap-2 p-5 w-[50rem] max-w-[100rem]">
          <h1 className="text-2xl lg:text-4xl font-bold text-primary">
            Find Your Dorm Now
          </h1>
          <p>Lorem ipsum</p>
          <div className="flex flex-col md:flex-row gap-8">
            <SearchBar />
            <Select />
            <Button
              color="primary"
              className="lg:max-w-fit px-5"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="flex flex-col gap-10 items-center justify-center">
        <HomeTitle title="Dorms for Rent in the Metro Manila, Philippines" />
        <p className="font-semibold  text-xl">Welcome to DormFinder.ph</p>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          tempor, enim a pharetra vestibulum, neque augue mattis lectus, nec
          luctus tortor lorem eget augue. Ut feugiat auctor urna in blandit. Ut
          quis dui sollicitudin nisi bibendum volutpat eu accumsan ligula. Nunc
          eleifend porttitor nisl, at ultrices erat hendrerit eu. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas.
        </p>
        <img
          src=""
          className=""
        />
      </section>

      {/* Featured Properties */}
      <section className="flex flex-col gap-10 items-center justify-center">
        <HomeTitle title="Featured Properties in DormFinder.PH" />
        <ul className="flex flex-col lg:flex-row gap-10">
          {dorms.map((dorm, index) => (
            <li key={index}>
              <Dorm
                img={dorm.img}
                dormName={dorm.dormName}
                location={dorm.location}
                ownerName={dorm.ownerName}
                price={dorm.price}
                rating={dorm.rating}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="flex flex-col gap-10 items-center justify-center">
        <HomeTitle title="How It Works" />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
      </section>

      {/* Why Join Us */}
      <section className="flex flex-col md:flex-row gap-10 items-center justify-center lg:mx-[10rem]">
        <img
          src={img}
          className="lg:w-[20rem] object-cover"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold">
            Use DormFinder.PH to find the best dorm for your needs
          </h1>
          <p>
            Whether finding the right dorm when college comes, a bed space while
            exploring the first job, or an apartment while saving for that dream
            house for your growing family, we provide options offering monthly
            to long-term stays giving you convenience in quickly accessing vast
            choices.
          </p>
          <Button
            color="primary"
            className="max-w-fit px-5"
          >
            Why Join Us
          </Button>
        </div>
      </section>

      {/* Renters Feedback */}
      <section className="flex flex-col gap-10 items-center justify-center lg:mb-[10rem]">
        <HomeTitle title="What Our Renters Say" />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rentersFeedback.map((rentersFeedback, index) => (
            <li key={index}>
              <RenterFeedback
                img={rentersFeedback.img}
                name={rentersFeedback.name}
                feedback={rentersFeedback.feedback}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Home;
