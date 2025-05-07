//IMPORTS
import "./DoctorDetailPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as doctorAPI from "../../utilities/doctor-api"
import * as prescriptionAPI from "../../utilities/prescription-api"
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
  const [myPrescriptions, setMyPrescriptions] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);

  const userRole = user?.is_doctor ? "doctor" : "patient";

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const doctor = await doctorAPI.show(id);
        const doctorsPrescriptions = await prescriptionAPI.myPrescriptions(id);
        setDoctorDetail(doctor);
        setMyPrescriptions(doctorsPrescriptions);
      } catch (err) {
        console.log(err);
        setDoctorDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  const uniquePatients = [
    ...new Map(myPrescriptions.map((p) => [p.patient.id, p.patient])).values(),
  ];

  if (!doctorDetail) return <h3>Your doctor details will display soon</h3>;

  const filteredPrescriptions = myPrescriptions.filter(
    (prescription) => prescription.patient.id === selectedPatientId
  );

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

      {/* {user?.is_doctor && ( */}
      <div className="doctor-prescribe-section">
        <PrescribeMedicine doctorId={id} />

        <h4 className="select-patient-statement">Select a patient to view their prescriptions:</h4>
        <select onChange={(e) => {
          setSelectedPatientId(parseInt(e.target.value));
          setSelectedPrescriptionId(null); 
        }} value={selectedPatientId || ""}>
          <option value=""> -- Select Patient -- </option>
          {uniquePatients?.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
        {selectedPatientId && (
          <>
            <h5>Select a prescription</h5>
            <select onChange={(e) => setSelectedPrescriptionId(parseInt(e.target.value))} value={selectedPrescriptionId || ""}>
              <option value=""> -- Select Prescription -- </option>
              {myPrescriptions
                .filter((p) => p.patient.id === selectedPatientId)
                .map((prescription) => (
                  <option key={prescription.id} value={prescription.id}>
                    {`Prescription #${prescription.id} - ${prescription.date_prescribed}`}
                  </option>
                ))}
            </select>
          </>
        )}
        {selectedPatientId && (
          <PrescriptionDetail presDetail={selectedPrescriptionId} user={user} />
        )}
      </div>
      {/* )} */}
    </>
  );
}

