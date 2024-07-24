import { getAuth, updateProfile } from "firebase/auth"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import {db} from "../firebase"
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const [changeDetail, setChangeDetail] = useState(false)
  const {name, email} = formData
  function onLogOut(){
    auth.signOut()
    navigate("/")
  }

  function onChange(e){
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        // update the name in firebase authentication
        await updateProfile(auth.currentUser,{
          displayName: name
        })

        // update the name in firestore
        const docRef = doc(db,"users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })
      }
      toast.success("Profile name updated")
      
    } catch (error) {
      toast.error("could not update profile name")
    }
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }
  return (
    <>
      <section className="flex max-w-6xl mx-auto flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-bold mt-6">Welcome {name}</h1>
        <div className="w-full md:w-[50%] px-3 mt-6">
          <form>
            <div className="flex items-center">
            <input type="text" id="name" value={name} className={`w-full text-xl px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6
            ${changeDetail && "bg-red-200 focus:bg-red-200"}`} disabled={!changeDetail}
            onChange={onChange} />

            <span className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer ml-3"
                onClick={()=> {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState)=> !prevState)}}> {changeDetail ? "Save" : "Edit"}
              </span>
            </div>
            

            <input type="email" id="email" value={email} className="w-full text-xl px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6" disabled />

            <div className="flex justify-end whitespace-nowrap text-sm sm:text-lg mb-6">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition ease-in-out duration-200 cursor-pointer"
                onClick={onLogOut}>Sign out
              </button>
            </div>

          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or Rent your home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
