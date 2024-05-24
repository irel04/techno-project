import owner from "../assets/owner.png";
import renter from "../assets/renter.png";
import Accordion from "../components/Accordion";
import HomeTitle from "../components/HomeTitle";

const dormerFaqs = [
  {
    question: "Title",
    answer: "Answsdfdser",
  },
];

const ownerFaqs = [
  {
    question: "Title",
    answer: "Answsdfdser",
  },
];

function Help() {
  return (
    <main className="flex flex-col  my-[3rem] md:my-[5rem] lg:my-[8rem] gap-[5rem]">
      <section className="flex flex-col items-center justify-center gap-5">
        <HomeTitle title="Frequently Asked Questions" />
        <p>Everything you need to know to use DormFinder.Ph like a pro!</p>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10">
          <a
            href="#dormers"
            className="w-full lg:w-[20rem] lg:h-[15rem]  bg-white shadow-custom p-6 flex md:flex-col items-center gap-5"
          >
            <img
              src={renter}
              className=" max-h-[5rem] md:mb-3"
            />
            <div className="flex flex-col gap-2 items-center">
              <h1 className="text-xl font-bold">For dormers</h1>
              <p className="italic">for renters, students</p>
            </div>
          </a>

          <a
            href="#owners"
            className="w-full lg:w-[20rem] lg:h-[15rem]  bg-white shadow-custom p-6 flex md:flex-col items-center gap-5"
          >
            <img
              src={owner}
              className=" max-h-[5rem] md:mb-3"
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
        <h1 className="text-2xl font-bold">For Dorm Owners</h1>

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
