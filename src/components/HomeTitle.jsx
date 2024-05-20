function HomeTitle({ title }) {
  return (
    <div className="flex flex-col gap-2 max-w-fit">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <hr className="border border-1 w-100 border-secondary" />
    </div>
  );
}

export default HomeTitle;
