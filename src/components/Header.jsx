import { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Header(){
    const [pageState, setPageState] = useState("Sign in") // State to manage page text
    const location = useLocation() // Hook to get current location
    const navigate = useNavigate()
    const auth = getAuth() // Get the Firebase auth instance

    // Effect to check authentication state
    useEffect(()=> {
      onAuthStateChanged(auth, (user)=> {
        if(user){
          setPageState("Profile") // Set text to "Profile" if user is logged in
        }
        else {
          setPageState("Sign in") // Set text to "Sign in" if no user is logged in
        }
      })
    },[auth]) // Dependency array, re-run effect when auth changes

    // Function to match current route with the given route
    function routeMatch(route){
      if(route === location.pathname){
        return true
      }
    }
  return(
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 mx-w-6xl mx-auto">
        <div>
          <img src="https://i.imgur.com/5p44rDg_d.jpg?maxwidth=520&shape=thumb&fidelity=high" alt="logo" className='h-20 w-20 cursor-pointer' onClick={()=> navigate("/")} />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${routeMatch("/") && "text-black border-b-red-500"}`}
              onClick={()=> navigate("/")}>Home</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${routeMatch("/offers") && "text-black border-b-red-500"}`}
              onClick={()=> navigate("/offers")}>Offers</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-500 border-b-[3px] border-b-transparent ${(routeMatch("/sign-in") || routeMatch("/profile")) && "text-black border-b-red-500"}`}
              onClick={()=> navigate("/profile")}>{pageState}</li>
          </ul>
        </div>
      </header>
    </div>
  )
}
