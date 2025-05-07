import sendRequest from "./sendRequest";

export function getReviews(doctorId) {
    return sendRequest(`/doctors/${doctorId}/reviews/`);
  }
  
export function submitReview(doctorId, formData) {
    return sendRequest(`/doctors/${doctorId}/reviews/`, 'POST', formData);
  }

export function updateReview(reviewId, formData) {
    return sendRequest(`/reviews/${reviewId}/`,'PUT', formData);
}

export function deleteReview(reviewId) {
      return sendRequest(`/reviews/${reviewId}/`, 'DELETE');
}

