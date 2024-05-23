import Button from "../components/Button";

function PostmyDorm() {
  return (
    <main className="flex flex-col lg:gap-[10rem] items-center justify-center my-[3rem] md:my-[5rem] lg:my-[10rem]">
      <section className="flex flex-col gap-5 items-center justify-center">
        <p className="text-2xl font-bold">Lorem ipsum</p>
        <h1 className="text-primary text-5xl font-extrabold">Lorem ipsum</h1>
        <p className="text-xl">Lorem ipsum</p>
        <Button
          color="primary"
          className="text-xl"
        >
          Create a Business Account
        </Button>
      </section>

      <section className="flex flex-col gap-5 items-center justify-center">
        {/* Insert picture of screenshot of dormy business side here */}
      </section>
    </main>
  );
}

export default PostmyDorm;
