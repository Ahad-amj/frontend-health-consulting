import sendRequest from "./sendRequest";
const url = "/doctors/"

export async function index() {
    return sendRequest(url)
}
export function show(doctorId) {
    return sendRequest(`${url}${doctorId}/`);
}
export function getPatientsOfDoctor(doctorId) {
    return sendRequest(`${url}${doctorId}/patients/`);
}