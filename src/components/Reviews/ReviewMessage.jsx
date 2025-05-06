import { useNavigate } from "react-router";
import * as reviewAPI from "../../utilities/review-api";
import "./review.css";

export default function ReviewMessage({ reviews, setReviews, review, userRole, editingReview, setEditingReview, editMessage, setEditMessage, handleEdit, editRating,setEditRating }) {
    const navigate = useNavigate();
    async function handleDelete(doctorId) {
        try {
            await reviewAPI.deleteReview(doctorId);
            setReviews(reviews.filter(r => r.id !== doctorId));
            navigate(`/doctors/${doctorId}/`)
        } catch (err) {
            console.error(err);
        }
    }

    return editingReview === review.id ? (
        <>
            <textarea className="edit-message-again"
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
            />
            <select value={editRating} onChange={(e) => setEditRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
            <div className="edit-controls">
                <button onClick={() => handleEdit(review.id)}>Save</button>
                <button onClick={() => setEditingReview(null)}>Cancel</button>
            </div>
        </>
    ) : (
        <>
            <p className="rating">Rating: {review.rating} ⭐</p>
            <p className="message-text">{review.message}</p>
            <p className="timestamp">Posted: {new Date(review.created_at).toLocaleString()}</p>
            <div className="message-actions">
                {userRole === "patient" && (
                    <>
                        <button className="edit-message" onClick={() => {
                            setEditingReview(review.id);
                            setEditMessage(review.message);
                            setEditRating(review.rating);
                        }}>Edit</button>
                        <button className="delete-message" onClick={() => handleDelete(review.id)}>Delete</button>
                    </>
                )}
            </div>
        </>
    );
}