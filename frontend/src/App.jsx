import Auth from "./Components/Auth.jsx";
import Chat from "./Components/Chat.jsx";
import  Home  from "./Components/Home.jsx";
import { Navbar } from "./Components/Navbar.jsx";
import { BrowserRouter , Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Auth><Chat /></Auth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
