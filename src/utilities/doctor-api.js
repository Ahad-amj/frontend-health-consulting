import { sendRequest } from "./sendRequest";
const url = "/doctors/"

export async function index() {
    return sendRequest(url)
}