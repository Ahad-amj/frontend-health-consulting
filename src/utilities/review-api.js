import sendRequest from "./sendRequest";

export function getReviews(doctorId) {
    return sendRequest(`/doctors/${doctorId}/reviews/`);
  }
  
export function submitReview(doctorId, formData) {
    console.log('review-api', formData)
    return sendRequest(`/doctors/${doctorId}/reviews/`, 'POST', formData);
  }

export function updateReview(reviewId, updatedData) {
    return sendRequest(`/reviews/${reviewId}/`,'PUT', updatedData);
}

export function deleteReview(reviewId) {
      return sendRequest(`/reviews/${reviewId}/`, 'DELETE');
}

export function updateReply(reviewId, replyData) {
  return sendRequest(`/reviews/${reviewId}/reply/`, 'PUT', replyData);
}

export function deleteReply(reviewId) {
  return sendRequest(`/reviews/${reviewId}/reply/`, 'DELETE');
}