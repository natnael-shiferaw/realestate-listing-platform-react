import { useState } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const {name, email} = formData
  function onLogOut(){
    auth.signOut()
    navigate("/")
  }
  return (
    <>
      <section className="flex max-w-6xl mx-auto flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] px-3 mt-6">
          <form>
            <input type="text" id="name" value={name} className="w-full text-xl px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6" disabled />

            <input type="email" id="email" value={email} className="w-full text-xl px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded transition ease-in-out mb-6" disabled />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out cursor-pointer ml-1"> Edit</span>
              </p>
              <p className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer" onClick={onLogOut}>Sign out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
