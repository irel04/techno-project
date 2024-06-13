import owner from "../assets/owner.png";
import renter from "../assets/renter.png";
import Accordion from "../components/Accordion";
import HomeTitle from "../components/HomeTitle";

const dormerFaqs = [
  {
    question: "How do I start searching for rental spaces?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          Visit{" "}
          <a
            href="https://techno-project-gamma.vercel.app/"
            className="text-primary"
          >
            www.dormfinder.ph
          </a>{" "}
          or click the search icon (magnifying glass).
        </li>
        <li>
          Enter the location or nearby landmark of the property you wish to
          rent, select your budget, and click Search.
        </li>
        <li>
          You can also refine your search using the following filters:
          <ul className="list-decimal pl-6">
            <li>Type of listing</li>
            <li>Type of property</li>
            <li>Accommodation type</li>
            <li>Room features</li>
            <li>Most recent properties listed</li>
            <li>Price rates</li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    question: "How can I check if a property is available?",
    answer: (
      <ul className="list-disc pl-6">
        <li>If a property is listed on the website, it is available.</li>
        <li>
          Landlords deactivate the listing when it is no longer available, so it
          won't appear on the website.
        </li>
      </ul>
    ),
  },
  {
    question: "How much do rental spaces on DormFinder.PH cost?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          Rental spaces range from as low as PhP 1,000 per month to over PhP
          20,000 per month.
        </li>
        <li>You have various options to fit your budget.</li>
      </ul>
    ),
  },
  {
    question: "Which locations does DormFinder.PH offer rental spaces in?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          DormFinder.PH offers thousands of rental spaces for students in:
          <ul>
            <li>Metro Manila</li>
            <li>CALABARZON</li>
            <li>Baguio</li>
            <li>Cebu</li>
            <li>Davao</li>
            <li>Iloilo</li>
            <li>Pampanga</li>
            <li>Other areas across the Philippines</li>
          </ul>
        </li>
      </ul>
    ),
  },
];

const ownerFaqs = [
  {
    question: "How do I list my dormitory on DormFinder.PH?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          To list your dormitory, visit{" "}
          <a
            href="https://techno-project-gamma.vercel.app/business-side/post-rental"
            className="text-primary"
          >
            www.dormfinder.ph/business-side/post-rental
          </a>{" "}
          and click on the Post a Dormitory button.
        </li>
        <li>
          Fill out the required information about your dormitory, including
          location, amenities, and pricing.
        </li>
        <li>
          Submit the listing for review. Once approved, your dormitory will be
          listed on DormFinder.Ph for potential renters.
        </li>
      </ul>
    ),
  },
  {
    question: "What are the benefits of listing my dormitory on DormFinder.PH?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          Reach a large audience of students and renters searching for dormitory
          accommodations.
        </li>
        <li>
          Increase occupancy rates by showcasing your dormitory's amenities and
          features.
        </li>
        <li>
          Manage your listings and inquiries efficiently through DormFinder.Ph's
          platform.
        </li>
      </ul>
    ),
  },
  {
    question: "How does DormFinder.PH handle rental payments and agreements?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          DormFinder.PH provides a platform for landlords to list their
          dormitories and connect with renters.
        </li>
        <li>
          Rental payments and agreements are handled directly between landlords
          and renters.
        </li>
        <li>
          DormFinder.PH does not facilitate or manage rental payments or
          agreements.
        </li>
      </ul>
    ),
  },
  {
    question: "Can I update or modify my dormitory listing on DormFinder.PH?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          Yes, you can update or modify your dormitory listing at any time.
        </li>
        <li>
          Log in to your DormFinder.PH account, navigate to your listings, and
          make the necessary changes.
        </li>
        <li>
          Ensure that all information is accurate and up-to-date to attract
          potential renters.
        </li>
      </ul>
    ),
  },
  {
    question: "How can I manage inquiries and bookings for my dormitory?",
    answer: (
      <ul className="list-disc pl-6">
        <li>
          Manage inquiries and bookings through your DormFinder.Ph dashboard.
        </li>
        <li>
          Respond promptly to inquiries, provide detailed information about your
          dormitory, and schedule viewings for potential renters.
        </li>
        <li>
          Keep track of bookings and ensure a smooth rental process for your
          tenants.
        </li>
      </ul>
    ),
  },
];

function Help() {
  return (
    <main className="flex flex-col my-[3rem] md:my-[5rem] lg:my-[8rem] gap-[5rem]">
      <section className="flex flex-col items-center justify-center gap-5">
        <HomeTitle title="Frequently Asked Questions" />
        <p>Everything you need to know to use DormFinder.Ph like a pro!</p>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10">
          <a
            href="#dormers"
            className="w-full lg:w-[20rem] lg:h-[15rem] bg-white shadow-custom p-6 flex md:flex-col items-center gap-5"
          >
            <img
              src={renter}
              className="max-h-[5rem] md:mb-3"
              alt="For dormers"
            />
            <div className="flex flex-col gap-2 items-center">
              <h1 className="text-xl font-bold">For dormers</h1>
              <p className="italic">for renters, students</p>
            </div>
          </a>

          <a
            href="#owners"
            className="w-full lg:w-[20rem] lg:h-[15rem] bg-white shadow-custom p-6 flex md:flex-col items-center gap-5"
          >
            <img
              src={owner}
              className="max-h-[5rem] md:mb-3"
              alt="For dorm owners"
            />
            <div className="flex flex-col gap-2 items-center">
              <h1 className="text-xl font-bold">For dorm owners</h1>
              <p className="italic">for hosts, landlords, agents</p>
            </div>
          </a>
        </div>
      </section>

      {/* For dormers */}
      <section
        className="mt-[5rem] flex flex-col gap-5"
        id="dormers"
      >
        <h1 className="text-2xl font-bold">For Dormers</h1>

        <ul className="flex flex-col gap-2">
          {dormerFaqs.map((dormerFaqs, index) => (
            <li key={index}>
              <Accordion
                question={dormerFaqs.question}
                answer={dormerFaqs.answer}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* For dorm owners */}
      <section
        className="flex flex-col gap-5"
        id="owners"
      >
        <h1 className="text-2xl font-bold">For Dorm Owners</h1>

        <ul className="flex flex-col gap-2">
          {ownerFaqs.map((ownerFaqs, index) => (
            <li key={index}>
              <Accordion
                question={ownerFaqs.question}
                answer={ownerFaqs.answer}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Help;
