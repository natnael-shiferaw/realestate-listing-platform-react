import { Navigate, Outlet } from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus';
import Spinner from "./Spinner"

export default function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus();
    if(checkingStatus){
        return <Spinner/>; // Display spinner while checking authentication status
    }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
  
}
