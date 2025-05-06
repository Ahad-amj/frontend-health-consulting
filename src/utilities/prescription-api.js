import sendRequest from "./sendRequest";

export function myPrescriptions(doctorId) {
  return sendRequest(`/doctors/${doctorId}/prescriptions/`);
}

export function getPrescriptionDetail(prescriptionId) {
  return sendRequest(`/prescriptions/${prescriptionId}/`);
}

export function createPrescribeMedicine(patientId, medicineId, formData) {
  return sendRequest(`/patients/${patientId}/medicines/${medicineId}/prescribe/`, 'POST', formData);
}
export function editPrescribeMedicine(prescriptionId, formData) {
  return sendRequest(`/prescriptions/${prescriptionId}/`, 'PUT', formData);
}

export function deletePrescription(prescriptionId) {
  return sendRequest(`/prescriptions/${prescriptionId}/`, 'DELETE');
}
