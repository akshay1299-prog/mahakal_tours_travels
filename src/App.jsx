import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Routes from "./pages/Routes";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    return isMobile && sessionStorage.getItem("mahakal-welcome-seen") !== "true";
  });

  useEffect(() => {
    if (!showWelcome) return undefined;

    const welcomeTimer = window.setTimeout(() => {
      sessionStorage.setItem("mahakal-welcome-seen", "true");
      setShowWelcome(false);
    }, 2000);

    return () => window.clearTimeout(welcomeTimer);
  }, [showWelcome]);

  return (
    <BrowserRouter>
      {showWelcome && (
        <div className="welcome-screen" role="status" aria-live="polite">
          <div className="welcome-glow" />
          <div className="welcome-content">
            <img src="/mahakallogo1.png" alt="Mahakal Tours and Travels" />
            <span className="welcome-line" />
            <p>Welcome to</p>
            <h1>Mahakal Tours and Travels</h1>
            <small>Your Journey, Our Responsibility.</small>
          </div>
        </div>
      )}
      <Navbar />
      <RouterRoutes>
        <Route path="/" element={<Home showFares={false} />} />
        <Route path="/routes" element={<Routes />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default App;