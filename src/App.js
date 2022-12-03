//import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Layout from "./pages/layout";
import Home from "./pages/home";
import Register from "./pages/registers";
import Login from "./pages/login";
import Events from "./pages/events";
import NoPage from "./pages/nopage";

export default function App() {
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" /*element={<Layout />}*/>
          <Route index element={<Home />}/>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="events" element={<Events />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
