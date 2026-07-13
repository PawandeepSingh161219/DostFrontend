import { Navigate } from "react-router-dom";

import  useAuth  from "../../hooks/useAuthContext";
import Signup from "../../pages/signup/Signup";


export default function GuestRoute({ children }) {

  const {
    isAuthenticated,
    loading,
  } = useAuth();


  if (loading) {

    return <h1>Loading...</h1>;
  }


  // Already logged in

  if (isAuthenticated) {

    return (
      <>
      {/* <h1>Hello guest</h1> */}
      <Navigate
        to="/"
        replace
      />
      </>
    );
  }

  return children;
}