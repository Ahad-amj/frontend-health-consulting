//IMPORTS
import "./DoctorDetailPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as doctorAPI from "../../utilities/doctor-api"
//IMAGES
import femaleDoctor from "../../assets/images/doctor_F.png";
import maleDoctor from "../../assets/images/doctor_M.png";
//PAGES
import ReviewBox from "../../components/ReviewBox/ReviewBox";
import PrescribeMedicine from "../../components/PrescribeMedicine/PrescribeMedicine";
import PrescriptionDetail from "../../components/PrescriptionDetail/PrescriptionDetail";

export default function DoctorDetailPage({ user }) {
  const [doctorDetail, setDoctorDetail] = useState(null);
  const { id } = useParams();
  console.log(id, "doctor")


  const userRole = user?.is_doctor ? "doctor" : "patient";

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const doctor = await doctorAPI.show(id);
        setDoctorDetail(doctor);
      } catch (err) {
        console.log(err);
        setDoctorDetail(null);
      }
    }
    if (id) getAndSetDetail()
  }, [id])

  if (!doctorDetail) return <h3>Your doctor details will display soon</h3>

  return (
    <>
      <div className="doctor-detail">
        <img
          src={doctorDetail.gender === "F" ? femaleDoctor : maleDoctor}
          alt={doctorDetail.name}
          className="doctor-detail-img"
        />
        <div className="doctor-detail-info">
          <h2>{doctorDetail.name}</h2>
          <p><span>Specialization:</span> {doctorDetail.specialization}</p>
          <p><span>Hospital:</span> {doctorDetail.hospital_affiliation}</p>
          <p><span>Years of Experience:</span> {doctorDetail.years_of_experience}</p>
        </div>
      </div>
      <div className="doctor-review-section">
        <ReviewBox doctorId={id} userRole={userRole} />
      </div>
      <div className="doctor-prescribe-section">
        <PrescribeMedicine doctorId={id}  />
        <PrescriptionDetail doctorId={id}  />
      </div>
    </>
  )
}
