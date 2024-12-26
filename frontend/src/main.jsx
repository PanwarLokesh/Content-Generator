import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import "./index.css";
import App from "./App.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrivyProvider
    appId="cm0y3f0r106om5nxme6x2bmbx"
    config={{
      // Display email and wallet as login methods
      loginMethods: ['email','google','twitter','github','linkedin'],
      // Customize Privy's appearance in your app
      appearance: {
        theme: 'light',
        accentColor: '#676FFF',
      },
      // Create embedded wallets for users who don't have a wallet
      embeddedWallets: {
        createOnLogin: 'users-without-wallets',
      },
    }}>
      <App />
    </PrivyProvider>
  </StrictMode>
);
