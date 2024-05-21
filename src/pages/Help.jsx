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
    <main className="lg:my-[8rem] lg:gap-[10rem] flex flex-col  ">
      <section className="flex flex-col items-center justify-center gap-5">
        <HomeTitle title="Frequently asked questions" />
        <p>Lorem ipsum</p>
        <div className="flex items-center justify-center gap-10 ">
          <a
            href="#dormers"
            className="lg:w-[20rem] lg:h-[15rem]  bg-white shadow-custom p-6 flex flex-col items-center"
          >
            <img
              src={owner}
              className="lg:h-[5rem] mb-3"
            />
            <h1 className="text-xl font-bold">For dormers</h1>
            <p className="italic">for hosts, landlords, agents</p>
          </a>

          <a
            href="#owners"
            className="lg:w-[20rem] lg:h-[15rem]  bg-white shadow-custom p-6 flex flex-col items-center"
          >
            <img
              src={renter}
              className="lg:h-[5rem] mb-3"
            />
            <h1 className="text-xl font-bold">For dorm owners</h1>
            <p className="italic">for student renters</p>
          </a>

          <a
            href=""
            className="lg:w-[20rem] lg:h-[15rem] bg-white shadow-custom p-6 flex flex-col items-center"
          >
            <img
              src={renter}
              className="lg:h-[5rem] mb-3"
            />
            <h1 className="text-xl font-bold">Submit feedback</h1>
            <p className="italic">for student renters</p>
          </a>
        </div>
      </section>

      {/* For dormers */}
      <section
        className="flex flex-col gap-5"
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
