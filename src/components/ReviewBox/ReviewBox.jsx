import { useEffect, useState } from "react";
import * as reviewAPI from "../../utilities/review-api";
import './ReviewBox.css';

export default function ReviewBox({ doctorId, userRole }) {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [replyMessage, setReplyMessage] = useState("");
    const [editingReview, setEditingReview] = useState(null);
    const [editingReply, setEditingReply] = useState(null);
    const [editMessage, setEditMessage] = useState("");

    useEffect(() => {
        async function loadReviews() {
            try {
                const data = await reviewAPI.getReviews(doctorId);
                setReviews(data);
            } catch (err) {
                console.error(err);
            }
        }
        if (doctorId) loadReviews();
    }, [doctorId]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const newReview = await reviewAPI.submitReview(doctorId, { message: message, rating: rating });
            setReviews([...reviews, newReview]);
            setMessage('');
            setRating(5);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleEdit(reviewId) {
        try {
            const updatedReview = await reviewAPI.updateReview(reviewId, { message: editMessage });
            setReviews(reviews.map(r => (r.id === reviewId ? updatedReview : r)));
            setEditingReview(null);
            setEditMessage('');
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDelete(reviewId) {
        try {
            await reviewAPI.deleteReview(reviewId);
            setReviews(reviews.filter(r => r.id !== reviewId));
        } catch (err) {
            console.error(err);
        }
    }

    async function handleReplyEdit(reviewId) {
        try {
            const updatedReview = await reviewAPI.updateReply(reviewId, { reply: replyMessage });
            setReviews(reviews.map(r => (r.id === reviewId ? updatedReview : r)));
            setEditingReply(null);
            setReplyMessage('');
        } catch (err) {
            console.error(err);
        }
    }

    async function handleReplyDelete(reviewId) {
        try {
            const updatedReview = await reviewAPI.deleteReply(reviewId);
            setReviews(reviews.map(r => (r.id === reviewId ? updatedReview : r)));
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

                            {editingReview === r.id ? (
                                <>
                                    <textarea
                                        value={editMessage}
                                        onChange={(e) => setEditMessage(e.target.value)}
                                    />
                                    <button onClick={() => handleEdit(r.id)}>Save</button>
                                    <button onClick={() => setEditingReview(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <p>{r.message}</p>
                                    <p className="timestamp">Posted: {new Date(r.created_at).toLocaleString()}</p>
                                    <p className="review-rating"><strong>Rating:</strong> {r.rating} ⭐</p>
                                    {userRole === "patient" && (
                                        <>
                                            <button onClick={() => {
                                                setEditingReview(r.id);
                                                setEditMessage(r.message);
                                            }}>Edit</button>
                                            <button onClick={() => handleDelete(r.id)}>Delete</button>
                                        </>
                                    )}
                                </>
                            )}

                            {userRole === "doctor" && editingReply === r.id ? (
                                <>
                                    <textarea
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                    />
                                    <button onClick={() => handleReplyEdit(r.id)}>Save Reply</button>
                                    <button onClick={() => setEditingReply(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <p><em>Reply:</em> {r.reply || "No reply yet"}</p>
                                    {userRole === "doctor" && (
                                        <>
                                            <button onClick={() => {
                                                setEditingReply(r.id);
                                                setReplyMessage(r.reply || "");
                                            }}>
                                                Edit Reply
                                            </button>
                                            <button onClick={() => handleReplyDelete(r.id)}>Delete Reply</button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
