import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Select from "../components/Select";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const dorms = [
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
  {
    img: img,
    dormName: "Dorm Name",
    location: "Location",
    ownerName: "Owner Name",
    price: "Price",
    rating: "Rating",
    status: "verified",
    link: "/dorm/id",
  },
];

const options = [
  "Php 1000 - 1500",
  "Php 1000 - 1500",
  "Php 1000 - 1500",
  "Php 1000 - 1500",
];




function FindaDorm() { 

  const [dormsData, setDormsData] = useState(null)

  // Loading of dorms just create useEffect then make an async function that will handle the request
  //  CC: JB MACACUA
  useEffect(() => {
    const fetchDorms = async () => {
      try {

        // Join tables by using the built-in function of select based on API Docs
        const { data: dorms, error: dormError } = await supabase.from("properties").select(`
          id,
          dorm_name,
          provider : lease_providers (
            last_name,
            first_name,
            isVerified
          ),
          rates: rent_rates(
            from
          ),
          ratings,
          location: addresses_property(
            province,
            city,
            barangay,
            street,
            longitude,
            latitude
          )
            `)
        
        if(dormError|| !dorms.length){
          throw dormError
        }

        // Render data
        setDormsData(dorms.map((dorm) => {
          const {street, barangay, city, province} = dorm.location
          const { last_name, first_name } = dorm.dorm_name
          const { isVerified } = dorm.provider
          return {
            img: "",
            dormName: dorm.dorm_name,
            location: `${street}, ${barangay}, ${city}, ${province}`,
            ownerName: `${first_name, last_name}`,
            price: dorm.rates.from,
            rating: dorm.ratings,
            isVerified: isVerified,
            link: `/dorm/${dorm.id}`,
          }
        }))
      } catch (error) {
        console.error(error)
        setDormsData([])
      }
    }

    fetchDorms()
  }, [])


  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center my-[3rem] md:my-[5rem]  ">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
        <SearchBar />

        <div className="flex items-center">
          <Select options={options} />
          <Filter />
        </div>
      </div>
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dormsData? dormsData.map((dorm, index) => (
          <li key={index}>
            <Dorm
              img={dorm.img}
              dormName={dorm.dormName}
              location={dorm.location}
              ownerName={dorm.ownerName}
              price={dorm.price}
              rating={dorm.rating}
              link={dorm.link}
              isVerfied={dorm.isVerified}

            />
          </li>
        )) : <p>Loading...</p>}
      </ul>
    </main>
  );
}

export default FindaDorm;
