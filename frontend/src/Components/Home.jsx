import { Link } from "react-router-dom";
import "./Home.css";
import { usePrivy } from "@privy-io/react-auth";

const  Home= ()=> {
  const { login,authenticated} = usePrivy();

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-header">
          <h1>Welcome to AI Content Generator</h1>
          <p>Transform your ideas into engaging content with the power of AI</p>
        </div>

        <div className="features">
          <FeatureCard
            title="Quick Generation"
            description="Generate high-quality content in seconds with advanced AI technology"
          />
          <FeatureCard
            title="Multiple Formats"
            description="Create blog posts, social media content, articles, and more"
          />
        </div>
      </div>
      <div className="btn-container">
        {authenticated? <Link to="/chat" className="get-started" >Chat</Link>:<button className="get-started" onClick={login}  >
          Get Started
        </button>}
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Home