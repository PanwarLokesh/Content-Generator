// import { usePrivy } from '@privy-io/react-auth'
// import React from 'react'
// import { Navigate } from 'react-router-dom';

// const Auth = ({children}) => {
    
//     const { ready, authenticated } = usePrivy();
//     if(!ready){
//         return <div>Loading...</div>
//     }
//     return (authenticated? children: <Navigate to="/" />)
// }

// export default Auth
import { Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

const Auth = ({ children }) => {
  const { authenticated } = usePrivy();

  if (!authenticated) {
    // Redirect to home if the user is not authenticated
    return <Navigate to="/" />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default Auth;
