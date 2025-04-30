import sendRequest from "./sendRequest";
const url = "/medicines/"

export function index() {
    return sendRequest(url)
}

export function show(medicineId) {
    return sendRequest(`${url}${medicineId}/`)
}