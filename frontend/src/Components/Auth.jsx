
import { Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

const Auth = ({ children }) => {
  const { authenticated } = usePrivy();

  if (!authenticated) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default Auth;
