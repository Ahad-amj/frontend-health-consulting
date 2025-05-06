import React, { useState, useEffect } from "react";
import * as PrescriptionAPI from "../../utilities/prescription-api";
import * as MedicineAPI from "../../utilities/medicine-api";
import './PrescriptionDetail.css';

const PrescriptionDetail = ({ presDetail, user }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [newMedicineId, setNewMedicineId] = useState("");
  const [medicines, setMedicines] = useState([]);

  const isDoctor = user?.is_doctor;

  useEffect(() => {
    async function fetchData() {
      try {
        const prescriptionData = await PrescriptionAPI.getPrescriptionDetail(presDetail);
        console.log(prescriptionData)
        setPrescriptions(prescriptionData);
        if (isDoctor) {
          const medData = await MedicineAPI.index();
          setMedicines(medData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescription details:", error);
      }
    }

    if (presDetail) fetchData();
  }, [presDetail, isDoctor]);

  const handleDelete = async (prescriptionId) => {
    try {
      await PrescriptionAPI.deletePrescription(prescriptionId);
      setPrescriptions((prev) => prev.filter((p) => p.id !== prescriptionId));
    } catch (error) {
      console.error("Error deleting prescription:", error);
    }
  };

  const handleEdit = (prescriptionId) => {
    setEditId(prescriptionId);
    setNewMedicineId(""); 
  };

  const handleSaveEdit = async (prescriptionId) => {
    try {
      await PrescriptionAPI.editPrescribeMedicine(prescriptionId, { medicine: newMedicineId });
      setEditId(null);
      setNewMedicineId("");
      const updatedData = await PrescriptionAPI.getPrescriptionDetail(presDetail);
      setPrescriptions(updatedData);
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  if (loading) return <p>Loading prescriptions...</p>;

  return (
    <div className="prescription-detail-container">
      <h3 className="prescription-detail-title">Prescription Details</h3>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found for this patient.</p>
      ) : (
        <ul className="prescription-detail-list">
          {prescriptions.map((prescription) => (
            <li key={prescription.id} className="prescription-detail-item">
              {editId === prescription.id ? (
                <>
                  <select
                    className="prescription-detail-select"
                    value={newMedicineId}
                    onChange={(e) => setNewMedicineId(e.target.value)}
                  >
                    <option value="">Select Medicine</option>
                    {medicines.map((med) => (
                      <option key={med.id} value={med.id}>
                        {med.name}
                      </option>
                    ))}
                  </select>
                  <div className="prescription-detail-buttons">
                    <button 
                      className="prescription-detail-button" 
                      onClick={() => handleSaveEdit(prescription.id)}
                    >
                      Save
                    </button>
                    <button 
                      className="prescription-detail-button" 
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{prescription.medicine.name} - {prescription.medicine.description}</span>
                  {isDoctor && (
                    <div className="prescription-detail-buttons">
                      <button 
                        className="prescription-detail-button" 
                        onClick={() => handleEdit(prescription.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="prescription-detail-button" 
                        onClick={() => handleDelete(prescription.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrescriptionDetail;
