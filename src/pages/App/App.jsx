//IMPORTS
import "./App.css";
import { Route, Routes, Link } from "react-router";
import { Navigate, useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUser } from '../../utilities/users-api';
//IMAGES
import logo from "../../assets/images/logo.png";
//PAGES
import AboutPage from "../AboutPage/AboutPage";
import HomePage from "../HomePage/HomePage";
import DoctorIndexPage from "../DoctorIndexPage/DoctorIndexPage";
import DoctorDetailPage from "../DoctorDetailPage/DoctorDetailPage";
import MedicineIndexPage from "../MedicineIndexPage/MedicineIndexPage"
import Navbar from '../../components/Navbar/Navbar';
import SignupPage from '../SignupPage/SignupPage';

export default function App() {
  const [user, setUser] = useState(null);
  const routes = ["about", "doctors", "home", "medicines","prescriptions"]
  const location = useLocation();
  const mainCSS = routes.filter(r => location.pathname.includes(r) ? r : "").join(" ")

  console.log(user)

  useEffect(() => {
    async function checkUser() {
      const loggedInUser = await getUser()
      setUser(loggedInUser)
    }
    checkUser()
  }, [])

  return (
    <>
      <header className="header">
        <div className={`${mainCSS} header-logo-container`}>
          <Link to="/">
            <img src={logo} alt="HealthConsulting Logo" className="header-logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <Navbar user={user} setUser={setUser} />
          </ul>
        </nav>

      </header>
      <main className={mainCSS}>
        <Routes>
          <Route path="/home" element={<HomePage user={user} setUser={setUser}/>} />
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/doctors" element={<DoctorIndexPage />} />
          <Route path="/doctor/:id" element={<DoctorDetailPage user={user} />} />
          <Route path="/medicines" element={<MedicineIndexPage />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        </Routes>
      </main>
    </>
  );
}
