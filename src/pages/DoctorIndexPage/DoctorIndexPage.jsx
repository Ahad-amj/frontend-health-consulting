import { Link } from "react-router";
import "./DoctorIndexPage.css";
import femaleDoctor from "../../assets/images/doctor_F.png";
import maleDoctor from "../../assets/images/doctor_M.png";
import DoctorDetailPage from "../DoctorDetailPage/DoctorDetailPage";

export default function DoctorIndexPage() {
  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      gender:"M",     
      specialty: "Cardiologist",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      gender:"F",
      specialty: "Neurologist",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Dr. Mark Brown",
      gender:"M",
      specialty: "Pediatrician",
      rating: 4.7,
    },
  ];

  return (
    <div className="doctors-index-page">
      <div className="doctors-list">
        <h2>Doctors List</h2>
        <div className="doctor-cards">
          {doctors.map((doctor) => (
            <Link to="/doctor/:id" className="doctor-card">
              <img
                src={
                  doctor.gender === "F"
                    ? femaleDoctor 
                    : maleDoctor
                }
                alt={doctor.name}
                className="doctor-img"
              />
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <span>⭐ {doctor.rating}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}  