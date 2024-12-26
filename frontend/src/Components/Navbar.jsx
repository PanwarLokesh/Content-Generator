import "./Navbar.css";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";


export function Navbar() {
  
  const { login,  authenticated, logout } = usePrivy();
  async function loginLogoutHandler(isAuthenticated){ 
    
    try {
      if (isAuthenticated) {
        await logout();
      } else {
        await login();
      }
    } catch (error) {
      console.error("Error during login/logout", error);
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">AI Content Generator</div>
        <div className="navbar-links">
          <Link to='/' className="navbar-link">Home</Link>
          {authenticated && (
            <Link to={"/chat"} className="navbar-link">
              Chat
            </Link>
          )}

          <Link  onClick={()=>{loginLogoutHandler(authenticated)}} className="navbar-link">
            {authenticated ? "Logout" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

