import Button from "../components/Button";
import Input from "../components/Input";
import logo from "../assets/default.jpg";

function Profile() {
  return (
    <main className="flex flex-col lg:gap-[10rem] items-center justify-center my-[3rem] md:my-[5rem] lg:mx-[5%]">
      <section className="w-full gap-5 lg:gap-10 flex flex-col md:flex-row">
        <div className="flex flex-col gap-5 items-center ">
          <img
            src={logo}
            className="rounded-3xl w-[10rem] h-[10rem] object-cover"
          />
          <Button
            color="primary"
            className="max-w-fit px-10"
          >
            Upload image
          </Button>
        </div>

        <div className="w-full ">
          <form className="rounded pt-0 p-5 flex flex-col gap-3">
            <h1 className="font-bold text-xl">Personal Information</h1>

            <Input
              type="email"
              label="Email"
            />

            <Input
              type="name"
              label="First Name"
            />
            <Input
              type="name"
              label="Last Name"
            />
            <Input
              type="number"
              label="Contact Number"
            />

            <Input
              type="date"
              label="Birthday"
            />

            <Button
              className="w-fit px-5 ml-auto"
              color="primary"
            >
              Save
            </Button>
          </form>

          <form className="rounded pt-0 p-5 flex flex-col gap-3">
            <h1 className="font-bold text-xl">Security Information</h1>

            <Input label="Current Password" />
            <Input label="New Password" />
            <Input label="Confirm New Password" />

            <Button
              className="w-fit px-5 ml-auto"
              color="primary"
            >
              Save
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Profile;
