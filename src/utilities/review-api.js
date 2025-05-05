import sendRequest from "./sendRequest";

export function getReviews(doctorId) {
    return sendRequest(`/doctors/${doctorId}/reviews/`);
  }
  
export function submitReview(doctorId, formData) {
    return sendRequest(`/doctors/${doctorId}/reviews/`, 'POST', formData);
  }

export function updateReview(doctorId, formData) {
    return sendRequest(`/doctors/${doctorId}/reviews/`,'PUT', formData);
}

export function deleteReview(doctorId) {
      return sendRequest(`/doctors/${doctorId}/reviews/`, 'DELETE');
}

export function updateReply(reviewId, formData) {
  return sendRequest(`/reviews/${reviewId}/reply/`, 'PUT', formData);
}

export function deleteReply(reviewId) {
  return sendRequest(`/reviews/${reviewId}/reply/`, 'DELETE');
}