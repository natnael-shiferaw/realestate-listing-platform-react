import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  // State to store landlord data
  const [landlord, setLandlord] = useState(null);
  // State to store the message input by the user
  const [message, setMessage] = useState("");
  // useEffect to fetch landlord data on component mount or when userRef changes
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef); // Reference to the user's document in Firestore
      const docSnap = await getDoc(docRef); // Fetch the document
      if (docSnap.exists()) {
        setLandlord(docSnap.data()); // Set landlord state if document exists
      } else {
        toast.error("Could not get landlord data"); // show error toast if document doesn't exist
      }
    }
    getLandlord(); // Call the async function
  }, [userRef]); // Dependency array to re-run effect when userRef changes
  // Function to handle message input change
  function onChange(e) {
    setMessage(e.target.value); // Update message state with the input value
  }
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`} // Mailto link with pre-filled subject and body
          >
            <button className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6" type="button">
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}
