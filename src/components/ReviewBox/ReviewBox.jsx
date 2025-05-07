import { useEffect, useState } from "react";
import * as reviewAPI from "../../utilities/review-api";
import './ReviewBox.css';
import ReviewMessage from "../Reviews/ReviewMessage";
import ReviewReply from "../Reviews/ReviewReply";

export default function ReviewBox({ doctorId, userRole }) {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);

    const [editingReview, setEditingReview] = useState(null);
    const [editMessage, setEditMessage] = useState("");
    const [editRating, setEditRating] = useState(5);


    useEffect(() => {
        async function loadReviews() {
            try {
                const data = await reviewAPI.getReviews(doctorId);
                console.log(data, "load reviews")
                setReviews(data);
            } catch (err) {
                console.error(err);
                setReviews([])
            }
        }
        if (doctorId) loadReviews();
    }, [doctorId]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const newReview = await reviewAPI.submitReview(doctorId, { message: message, rating: rating });
            console.log(newReview, "check new review")
            setReviews([...reviews, newReview]);
            setMessage('');
            setRating(5);
        } catch (err) {
            console.error(err);
        }
    }
    async function handleEdit(evt, reviewId) {
        try {
            evt.preventDefault()
            console.log(reviewId)
            const updatedReview = await reviewAPI.updateReview(reviewId, { message: editMessage, rating: editRating });
            console.log(updatedReview, "update")
            const updatedReviews = reviews.map((r) => r.id === reviewId ? updatedReview : r);
            setReviews(updatedReviews);
            setEditingReview(null);    
            setEditMessage('');
            setEditRating(5);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="review-box">
            {userRole === "patient" && (
                <>
                    <h3>Type your inquiry here!</h3>
                    <form onSubmit={handleSubmit} className="review-form">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            placeholder="Write your inquiry here..."
                        />
                        <h4>Rate the service here!</h4>
                        <select id="rate-select" value={rating} onChange={(evt) => setRating(Number(evt.target.value))}>
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                        <div className="submit-button-wrapper">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </>
            )}

            <div className="review-list">
                <h4>Inquiries</h4>
                {reviews.length === 0 ? (
                    <p>No inquiry yet.</p>
                ) : (
                    reviews.map((r) => (
                        <div key={r.id} className="review">
                            <div className="review-message-box">
                                <ReviewMessage
                                    review={r}
                                    userRole={userRole}
                                    editingReview={editingReview}
                                    setEditingReview={setEditingReview}
                                    editMessage={editMessage}
                                    setEditMessage={setEditMessage}
                                    editRating={editRating}
                                    setEditRating={setEditRating}
                                    reviews={reviews}
                                    setReviews={setReviews}
                                    handleEdit={handleEdit}
                                />
                            </div>
                            {/* <div className="review-reply-box">
                                <ReviewReply
                                    review={r}
                                    userRole={userRole}
                                    editingReply={editingReply}
                                    setEditingReply={setEditingReply}
                                    replyMessage={replyMessage}
                                    setReplyMessage={setReplyMessage}
                                    reviews={reviews}
                                    setReviews={setReviews}
                                    handleEdit={handleEdit}
                                    handleSubmit={handleSubmit}
                                />
                            </div> */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
