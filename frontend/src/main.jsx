import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import { ChatProvider } from "./Components/Chat.jsx";
import "./index.css";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrivyProvider
      appId="cm0y3f0r106om5nxme6x2bmbx"
      config={{
        loginMethods: ["email", "google", "twitter", "github", "linkedin"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <ChatProvider>
        <App />
      </ChatProvider>
    </PrivyProvider>
  </StrictMode>
);
