import "./App.css";
import { Route, Routes, Link } from "react-router"; 
import logo from "../../assets/images/logo.png"; 
import AboutPage from "../AboutPage/AboutPage";
import HomePage from "../HomePage/HomePage";
import DoctorIndexPage from "../DoctorIndexPage/DoctorIndexPage";
import DoctorDetailPage from "../DoctorDetailPage/DoctorDetailPage";

export default function App() {
  return (
    <>
      <header className="header">
        <div className="header-logo-container">
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
      <main>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/doctors" element={<DoctorIndexPage />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        </Routes>
      </main>
    </>
  );
}
