import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {doc, updateDoc} from "firebase/firestore"
import {db} from "../firebase"

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
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
  return (
    <>
      <section className="flex max-w-6xl mx-auto flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] px-3 mt-6">
          <form>
            <input type="text" id="name" value={name} className={`w-full text-xl px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6
            ${changeDetail && "bg-red-200 focus:bg-red-200"}`} disabled={!changeDetail}
            onChange={onChange} />

            <input type="email" id="email" value={email} className="w-full text-xl px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6" disabled />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer ml-1"
                onClick={()=> {
                  changeDetail && onSubmit();
                  setChangeDetail((prevState)=> !prevState)}}> {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer" onClick={onLogOut}>Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
