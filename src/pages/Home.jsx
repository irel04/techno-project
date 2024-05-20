import HomeTitle from "../components/HomeTitle";
import Dorm from "../components/Dorm";
import img from "../assets/owner.png";

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

function Home() {
  return (
    <main className="flex flex-col gap-10 items-center justify-center">
      <section className="flex flex-col gap-5 items-center justify-center">
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

      <section className="flex flex-col gap-5 items-center justify-center">
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
    </main>
  );
}

export default Home;
