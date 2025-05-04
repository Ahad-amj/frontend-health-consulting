import "./DoctorIndexPage.css";
import femaleDoctor from "../../assets/images/doctor_F.png";
import maleDoctor from "../../assets/images/doctor_M.png";
// IMPORTS
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
// APIs
import * as doctorAPI from "../../utilities/doctor-api";

export default function DoctorIndexPage() {

    const [allDoctors, setAllDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllDoctors() {
            try {
                const doctorData = await doctorAPI.index()
                setAllDoctors(doctorData)
            } catch (err) {
                console.log(err);
            }
        }
        if (allDoctors.length === 0) getAllDoctors()
    }, [])
    const handleChange = (doctorId) => {
      navigate(`/doctor/${doctorId}`);
    };
      

  return (
    <div className="doctors-index-page">
      <div className="doctors-list">
        <h2>Doctors List</h2>
        <div className="doctor-cards">
          {allDoctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id} onClick={() => handleChange(doctor.id)}>
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
                <p>{doctor.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  