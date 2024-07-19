import React, { useState, useEffect } from 'react';
import Dorm from "../components/Dorm";
import img from "../assets/owner.png";
import NoData from "../components/NoData";
import HomeTitle from "../components/HomeTitle";
import DormListSkeleton from "../components/skeletons/DormListSkeleton";
import { supabase } from "../utils/supabase";

function Favorites() {
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Fetch all favorite property_ids from renter_likes table
        const { data: favoriteData, error: favoriteError } = await supabase
          .from("renter_likes")
          .select("property_id");

        if (favoriteError) {
          throw favoriteError;
        }

        const propertyIds = favoriteData.map((fav) => fav.property_id);

        if (propertyIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        // Fetch dorms details using property_ids
        const { data: dorms, error: dormError } = await supabase
          .from("properties")
          .select(`
            id,
            dorm_name,
            provider: lease_providers (
              last_name,
              first_name,
              isVerified
            ),
            rates: rent_rates(
              from
            ),
            cover_photo,
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
          .in("id", propertyIds);

        if (dormError) {
          throw dormError;
        }

        setFavorites(
          dorms.map((dorm) => {
             const {street, barangay, city, province} = dorm.location
          const { id: ownerId, last_name, first_name } = dorm.provider
          const { isVerified } = dorm.provider
          return {
            img: dorm.cover_photo,
            dormName: dorm.dorm_name,
            location: `${city}, ${province}`,
            ownerName: `${first_name} ${last_name}`,
            price: dorm.rates.from,
            rating: dorm.ratings,
            isVerified: isVerified,
            link: `/dorm/${dorm.id}?owner=${ownerId}`,
            };
          })
        );
      } catch (error) {
        console.error(error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <main className="w-full flex flex-col gap-10 items-center justify-center my-[3rem] md:my-[5rem]">
      <HomeTitle title="Favorites" />
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <DormListSkeleton key={index} />
        ))
      ) : favorites.length === 0 ? (
        <NoData
          img={img}
          title="No favorite dorm found"
        />
      ) : (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {favorites.map((dorm, index) => (
            <li key={index}>
              <Dorm
                img={dorm.img}
                dormName={dorm.dormName}
                location={dorm.location}
                ownerName={dorm.ownerName}
                price={dorm.price}
                rating={dorm.rating}
                status={dorm.status}
                link={dorm.link}
                isVerfied={dorm.isVerified}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Favorites;
