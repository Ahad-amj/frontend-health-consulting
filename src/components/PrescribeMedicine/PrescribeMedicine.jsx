import React, { useState } from "react";
import * as PrescriptionAPI from "../../utilities/prescription-api";

const PrescribeMedicine = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
//    here the ids and formData
  const handlePrescribe = async () => {
    try {
      const data = await PrescriptionAPI.createPrescribeMedicine(patientId, medicineId);
      setSuccessMessage("Medicine prescribed successfully!");
      setError(null);
    } catch (error) {
      setError("Error prescribing medicine. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <button onClick={handlePrescribe}>Prescribe Medicine</button>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default PrescribeMedicine;