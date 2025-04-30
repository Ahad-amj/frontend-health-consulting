//IMPORTS
import "./App.css";
import { Route, Routes, Link } from "react-router"; 
import { Navigate, useLocation } from "react-router";
//IMAGES
import logo from "../../assets/images/logo.png"; 
//PAGES
import AboutPage from "../AboutPage/AboutPage";
import HomePage from "../HomePage/HomePage";
import DoctorIndexPage from "../DoctorIndexPage/DoctorIndexPage";
import DoctorDetailPage from "../DoctorDetailPage/DoctorDetailPage";

export default function App() {
  const routes = ["about", "doctors", "home"]
  const location = useLocation();
  const mainCSS = routes.filter(r => location.pathname.includes(r) ? r : "").join(" ")
  return (
    <>
      <header className="header">
        <div className={`${mainCSS} header-logo-container`}>
          <Link to="/">
            <img src={logo} alt="HealthConsulting Logo" className="header-logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
          </ul>
        </nav>
      </header>
      <main className={mainCSS}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/*" element={ <Navigate to="/home"/>}/>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/doctors" element={<DoctorIndexPage />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        </Routes>
      </main>
    </>
  );
}
