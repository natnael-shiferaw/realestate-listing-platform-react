import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import 'swiper/css'; // Import Swiper CSS
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import Swiper modules
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import { useNavigate } from "react-router-dom";

export default function Slider() {
  const [listings, setListings] = useState(null); // State for listings data
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings"); // Reference to listings collection in Firestore
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5)); // Query to get the latest 5 listings
      const querySnap = await getDocs(q); // Execute query
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        }); // Push each listing to array
      });
      setListings(listings); // Update state with listings
      setLoading(false); // Set loading to false after data is fetched
    }
    fetchListings(); // Fetch listings when component mounts
  }, []);

  if (loading) {
    return <Spinner />; // Show spinner while loading
  }

  if (listings.length === 0) {
    return <></>; // Return empty fragment if no listings are found
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1} // Show one slide at a time
          navigation // Enable navigation
          pagination={{ type: "progressbar" }} // Enable pagination
          effect="fade" // Set fade effect
          modules={[Autoplay, Navigation, Pagination, EffectFade]} // Include Swiper modules
          autoplay={{ delay: 3000 }} // Enable autoplay with 3 seconds delay
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id} // Unique key for each slide
              onClick={() => navigate(`/category/${data.type}/${id}`)} // Navigate to listing detail on click
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center no-repeat`, // Set background image
                  backgroundSize: "cover", // Cover the container
                }}
                className="relative w-full h-[300px] overflow-hidden" // Styling for the image container
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
                {data.name} // Listing name
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
                ${data.discountedPrice ?? data.regularPrice} // Listing price
                {data.type === "rent" && " / month"} // Add "/ month" if listing is for rent
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
