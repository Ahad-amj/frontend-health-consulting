import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as PrescriptionAPI from "../../utilities/prescription-api";

const PrescriptionDetail = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [newMedicineId, setNewMedicineId] = useState("");
  const { prescriptionId } = useParams();


  useEffect(() => {
    async function fetchPrescriptions() {
      try {
        const data = await PrescriptionAPI.getPrescriptionDetail(prescriptionId);
        console.log(data, "prescription")
        setPrescriptions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    }
    fetchPrescriptions();
  }, [prescriptionId]);

  const handleDelete = async (prescriptionId) => {
    try {
      await PrescriptionAPI.deletePrescription(prescriptionId);
      setPrescriptions((prev) => prev.filter((p) => p.id !== prescriptionId) );
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
      const data = await PrescriptionAPI.getPrescriptionDetail(prescriptionId);
      setPrescriptions(data);
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  if (loading) {
    return <p>Loading prescriptions...</p>;
  }

  return (
    <div className="prescription-detail">
      <h3>Prescription Details</h3>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found for this patient.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription.id}>
              {editId === prescription.id ? (
                <>
                  <input type="text" value={newMedicineId} onChange={(e) => setNewMedicineId(e.target.value)} placeholder="New Medicine ID"/>
                  <button onClick={() => handleSaveEdit(prescription.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {prescription.medicine.name} - {prescription.medicine.description}
                  <button onClick={() => handleDelete(prescription.id)}>Delete</button>
                  <button onClick={() => handleEdit(prescription.id)}>Edit</button>
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
