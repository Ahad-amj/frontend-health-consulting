import sendRequest from "./sendRequest";

export function getPrescriptionDetail(prescriptionId) {
  return sendRequest(`/prescriptions/${prescriptionId}`);
}

export function createPrescribeMedicine(patientId, medicineId) {
  return sendRequest(`/patients/${patientId}/medicines/${medicineId}/prescribe/`, 'POST');
}
export function editPrescribeMedicine(prescriptionId, data) {
  return sendRequest(`/prescriptions/${prescriptionId}/`, 'PUT', data);
}

export function deletePrescription(prescriptionId) {
  return sendRequest(`/prescriptions/${prescriptionId}/`, 'DELETE');
}
