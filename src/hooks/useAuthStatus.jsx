import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

// Custom hook to check the authentication status of the user
export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false) // State to store if the user is logged in
    const [checkingStatus, setCheckingStatus] = useState(true) // State to store if the authentication status is being checked

    useEffect(()=> {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => { // Listener for changes in authentication state
            if(user){
                setLoggedIn(true); // Set loggedIn to true if user is authenticated
            }
            setCheckingStatus(false) // Set checkingStatus to false after checking the authentication status
        });
    }, []) // Empty dependency array to run the effect only once on mount
  return {
    loggedIn, checkingStatus // Return the authentication status and the checking status
}
}
