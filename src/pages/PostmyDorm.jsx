import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function PostmyDorm() {
  const navigate = useNavigate();
  const navigateToRegister = () => navigate("/account");

  return (
    <main className="flex flex-col lg:gap-[10rem] items-center justify-center my-[3rem] md:my-[5rem] lg:my-[10rem]">
      <section className="flex flex-col gap-5 items-center justify-center md:mx-[15%]">
        <p className="text-2xl font-bold">
          Tired of relying on unorganized platforms to find tenants?
        </p>
        <h1 className="text-center text-primary text-5xl font-extrabold">
          Be part of the DormFiner.PH rental family
        </h1>
        <p className="text-xl text-center">
          Join DormFinder.Ph: Your centralized hub for streamlined rental
          management, connecting landlords with tenants in Metro Manila's
          vibrant student housing market.
        </p>
        <Button
          color="primary"
          className="max-w-fit px-5 text-xl"
          onClick={navigateToRegister}
        >
          Create a Business Account
        </Button>
      </section>

      <section className="flex flex-col gap-5 items-center justify-center">
        {/* Insert picture of screenshot of dormy business side here */}
        <img
          src=""
          className=""
        />
      </section>
    </main>
  );
}

export default PostmyDorm;
