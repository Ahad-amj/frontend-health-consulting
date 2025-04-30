import "./DoctorDetailPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as doctorAPI from "../../utilities/doctor-api"


export default function DoctorDetailPage() {
  const [doctorDetail, setDoctorDetail] = useState(null);
  const { id } = useParams();

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
    <div className="doctor-detail">
      <h2>{doctorDetail.name}</h2>
      <p>Specialization: {doctorDetail.specialization}</p>
      <p>Hospital: {doctorDetail.hospital_affiliation}</p>
      <p>Years of Experience: {doctorDetail.years_of_experience}</p>
    </div>
  )
}