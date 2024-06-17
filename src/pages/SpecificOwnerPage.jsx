import dormOwnerPicture from "../assets/default.jpg";
import { MdOutlineMail, MdOutlinePhoneInTalk } from "react-icons/md";
import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import OwnerPageSkeleton from "../components/skeletons/OwnerPageSkeleton";



function SpecificOwnerPage() {
  const { ownerId } = useParams();
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [dormListings, setDormListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwnerAndDorms = async () => {
      try {
      
        const { data: ownerInfo, error: ownerError } = await supabase
          .from("lease_providers")
          .select("id, first_name, last_name, email, contact_no")
          .eq("id", ownerId)
          .single();

        if (ownerError) {
          throw ownerError;
        }

        const { data: dormsInfo, error: dormsError } = await supabase
          .from("properties")
          .select(`
            id, 
            dorm_name, 
            ratings, 
            addresses_property (
              province, city, barangay, street
            ),
            rent_rates (
              from
            )
          `)
          .eq("provider_id", ownerId);

        if (dormsError) {
          throw dormsError;
        }

        setOwnerDetails(ownerInfo);
        setDormListings(dormsInfo);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwnerAndDorms();
  }, [ownerId]);

  if (isLoading) return <OwnerPageSkeleton/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="flex flex-col gap-5 my-[3rem] mx-[5%]">
      <section className="flex flex-col md:flex-row gap-2 md:gap-10 items-center">
        <img
          src={dormOwnerPicture}
          className="w-[10rem] h-[10rem] object-cover"
        />
        <div className="flex flex-col gap-2 items-center md:items-start">
          <h1 className="text-3xl font-bold">{`${ownerDetails.first_name} ${ownerDetails.last_name}`}</h1>
          <p className="flex gap-1 items-center">
            <MdOutlineMail />
            {ownerDetails.email}
          </p>
          <p className="flex gap-1 items-center">
            <MdOutlinePhoneInTalk />
            {ownerDetails.contact_no}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-4">
        <div className="w-full bg-blue-50 rounded border p-4 text-center flex flex-col gap-2">
          <p className="text-primary font-bold text-sm uppercase">
            Verified Listings
          </p>
          <span className="text-2xl font-extrabold">{dormListings.length}</span>
        </div>

        <div className="w-full bg-blue-50 rounded border p-4 text-center flex flex-col gap-2">
          <p className="text-primary font-bold text-sm uppercase">
            User Favorites
          </p>
          <span className="text-2xl font-extrabold">9 Favorites</span>
        </div>

        <div className="w-full bg-blue-50 rounded border p-4 text-center flex flex-col gap-2">
          <p className="text-primary font-bold text-sm uppercase">
            Joined Date
          </p>
          <span className="text-2xl font-extrabold">May 2024</span>
        </div>
      </section>

      {/* List of Dorm Listings */}
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dormListings.map((dorm) => (
          <li key={dorm.id}>
            <Dorm
              img={img} 
              dormName={dorm.dorm_name}
              location={`${dorm.addresses_property.street}, ${dorm.addresses_property.barangay}, ${dorm.addresses_property.city}, ${dorm.addresses_property.province}`} 
              ownerName={`${ownerDetails.first_name} ${ownerDetails.last_name}`}
              price={dorm.rent_rates.from} 
              rating={dorm.ratings}
              status="verified" 
              link={`/dorm/${dorm.id}`}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default SpecificOwnerPage;
