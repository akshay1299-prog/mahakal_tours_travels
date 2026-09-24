import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Routes from "./pages/Routes";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <RouterRoutes>
        <Route path="/" element={<Home showFares={false} />} />
        <Route path="/routes" element={<Routes />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default App;