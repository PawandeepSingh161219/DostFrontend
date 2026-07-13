import { Navigate } from "react-router-dom";

import  useAuth  from "../../hooks/useAuthContext";


export default function ProtectedRoute({ children }) {

  const {
    isAuthenticated,
    loading,
  } = useAuth();


  // ======================
  // WAIT FOR AUTH INIT
  // ======================

  if (loading) {

    return <h1>Loading...</h1>;
  }


  // ======================
  // NOT AUTHORIZED
  // ======================

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // ======================
  // AUTHORIZED
  // ======================

  return children;
}