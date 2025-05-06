import React, { useState, useEffect } from "react";
import * as PrescriptionAPI from "../../utilities/prescription-api";
import * as MedicineAPI from "../../utilities/medicine-api";
import * as doctorAPI from "../../utilities/doctor-api";
import './PrescriptionMedicine.css';

const PrescribeMedicine = ({ doctorId }) => {
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: doctorId, 
    medicineId: "",
    date_prescribed: new Date().toISOString().split('T')[0], 
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPatients = await doctorAPI.getPatientsOfDoctor(doctorId);
        const fetchedMedicines = await MedicineAPI.index();
        setPatients(fetchedPatients);
        setMedicines(fetchedMedicines);
      } catch (err) {
        console.error("Error fetching dropdown data", err);
      }
    }
    fetchData();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrescribe = async () => {
    const { patientId, medicineId, date_prescribed } = formData;
    if (!patientId || !medicineId || !date_prescribed) {
      setError("Please select all fields (patient, medicine, and date).");
      return;
    }
    try {
      await PrescriptionAPI.createPrescribeMedicine(patientId, medicineId, date_prescribed);
      setSuccessMessage("Medicine prescribed successfully!");
      setError(null);
    } catch (error) {
      setError("Error prescribing medicine. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="prescribe-medicine-container">
      <h3 className="prescribe-medicine-title">Prescribe Medicine</h3>

      <label className="prescribe-medicine-label">Patient:</label>
      <select 
        className="prescribe-medicine-select"
        name="patientId" 
        value={formData.patientId} 
        onChange={handleChange}
      >
        <option value="">Select Patient</option>
        {patients?.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <label className="prescribe-medicine-label">Medicine:</label>
      <select 
        className="prescribe-medicine-select"
        name="medicineId" 
        value={formData.medicineId} 
        onChange={handleChange}
      >
        <option value="">Select Medicine</option>
        {medicines.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      <label className="prescribe-medicine-label">Date Prescribed:</label>
      <input 
        className="prescribe-medicine-input-date"
        type="date" 
        name="date_prescribed" 
        value={formData.date_prescribed} 
        onChange={handleChange} 
      />

      <button 
        className="prescribe-medicine-button" 
        onClick={handlePrescribe}
      >
        Prescribe
      </button>

      {error && <p className="prescribe-medicine-error">{error}</p>}
      {successMessage && <p className="prescribe-medicine-success">{successMessage}</p>}
    </div>
  );
};

export default PrescribeMedicine;
