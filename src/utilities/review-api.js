import sendRequest from "./sendRequest";

export function getReviews(doctorId) {
    return sendRequest(`/doctors/${doctorId}/reviews/`);
  }
  
export function submitReview(doctorId, formData) {
    console.log('review-api', formData)
    return sendRequest(`/doctors/${doctorId}/reviews/`, 'POST', formData);
  }