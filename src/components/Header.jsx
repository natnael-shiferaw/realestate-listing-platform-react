import { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Header(){
    const [pageState, setPageState] = useState("Sign in")
    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()

    useEffect(()=> {
      onAuthStateChanged(auth, (user)=> {
        if(user){
          setPageState("Profile")
        }
        else {
          setPageState("Sign in")
        }
      })
    },[auth])
    function routeMatch(route){
      if(route === location.pathname){
        return true
      }
    }
  return(
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 mx-w-6xl mx-auto">
        <div>
          <img src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg" alt="logo" className='h-5 cursor-pointer' onClick={()=> navigate("/")} />
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