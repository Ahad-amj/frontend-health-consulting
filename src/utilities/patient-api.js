import sendRequest from "./sendRequest";
const url = "/patients/"
export function getPatientsOfDoctor() {
    return sendRequest(`${url}`);
}