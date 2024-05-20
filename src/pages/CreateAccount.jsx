import owner from "../assets/owner.png";
import renter from "../assets/renter.png";
function CreateAccount() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div>
        <h1 className="text-2xl font-extrabold">Create An Account</h1>
        <p>Select what best describes you</p>
      </div>

      <div className="flex items-center justify-center gap-10">
        <a
          href=""
          className="bg-white shadow-custom p-6 flex flex-col items-center"
        >
          <img
            src={owner}
            className="lg:h-[15rem] mb-3"
          />
          <h1 className="text-xl font-bold">I want to post my propery</h1>
          <p className="italic">for hosts, landlords, agents</p>
        </a>

        <a
          href=""
          className="bg-white shadow-custom p-6 flex flex-col items-center"
        >
          <img
            src={renter}
            className="lg:h-[15rem] mb-3"
          />
          <h1 className="text-xl font-bold">
            I am looking for a place to stay
          </h1>
          <p className="italic">for student renters</p>
        </a>
      </div>
      <p className="flex gap-1">
        Already have an account?
        <a
          href="/login"
          className="text-primary font-semibold underline"
        >
          Login here
        </a>
      </p>
    </div>
  );
}

export default CreateAccount;
