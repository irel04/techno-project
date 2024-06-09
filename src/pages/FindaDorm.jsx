import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Select from "../components/Select";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { dormSchema } from "../schema/dorms";

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
          lease_providers (
            last_name,
            first_name,
            isVerified
          ),
          rent_rates(
            actual_rate
          ),
          ratings,
          addresses_property(
            province,
            city,
            barangay,
            street,
            longitude,
            latitude
          )
            `)
        
        if(dormError){
          throw dormError
        }

        const structure = {...dormSchema, }

        setDormsData(dorms)
        console.log(dorms)
      } catch (error) {
        console.error(error)
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
        {dormsData? dorms.map((dorm, index) => (
          <li key={index}>
            <Dorm
              img={dorm.img}
              dormName={dorm.dorm_name}
              location={dorm.location}
              ownerName={dorm.ownerName}
              price={dorm.price}
              rating={dorm.ratings}
              status={dorm.status}
              link={dorm.link}
            />
          </li>
        )) : <p>Loading...</p>}
      </ul>
    </main>
  );
}

export default FindaDorm;
