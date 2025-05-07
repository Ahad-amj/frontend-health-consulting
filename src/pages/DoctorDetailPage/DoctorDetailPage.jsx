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
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  const [myPatients, setMyPatients] = useState([])
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);

  const userRole = user?.is_doctor ? "doctor" : "patient";

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const doctorData = await doctorAPI.show(id);
        setMyPatients(doctorData.patients)
        setDoctorDetail(doctorData.doctor);
      } catch (err) {
        console.log(err);
        setDoctorDetail(null);
      }
    }
    if (id) getAndSetDetail();
  }, [id]);

  async function getPatientPrescriptions() {
    try {
      const patientPrescrips = await prescriptionAPI.getPatientPrescriptions(selectedPatientId);
      console.log(patientPrescrips, "patientPrescrips")
      setPatientPrescriptions(patientPrescrips)
    } catch (err) {
      console.error(err, "error getting prescriptions")
    }
  }

  // function handleSetPrescriptionId(evt) {
  //   if (evt.target.value) setSelectedPrescriptionId(evt.target.value);
  // }

  if (!doctorDetail) return <h3>Your doctor details will display soon</h3>;

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
        <select onChange={(e) => { setSelectedPatientId(e.target.value) }} value={selectedPatientId || ""}>
          <option value=""> -- Select Patient -- </option>
          {myPatients?.map((p) => (<option key={p.id} value={p.id} onClick={getPatientPrescriptions}>{p.name}</option>))}
        </select>
        {selectedPatientId && (
          <>
            <h5>Select a prescription</h5>
            <select className="select-pres"onChange={(e) => setSelectedPrescriptionId(e.target.value)} value={selectedPrescriptionId || ""}>
              <option className="select-prescription" value=""> -- Select Prescription -- </option>
              {patientPrescriptions.map((pre) => (
                <option key={pre.id} value={pre.id}>
                  {`Prescription #${pre.id} - ${pre.date_prescribed}`}
                </option>
              ))}
            </select>
          </>
        )}
        {selectedPatientId && (
          <PrescriptionDetail presDetail={selectedPrescriptionId} patientPrescriptions={patientPrescriptions} setPatientPrescriptions={setPatientPrescriptions} user={user} />
        )}
      </div>
      {/* )} */}
    </>
  );
}

