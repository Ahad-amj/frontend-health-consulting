import { useNavigate } from "react-router";
import * as reviewAPI from "../../utilities/review-api";

export default function ReviewMessage({reviews, setReviews, review ,userRole ,editingReview, setEditingReview, editMessage, setEditMessage, handleEdit}) {
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
            <textarea
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
            />
            <button onClick={() => handleEdit(review.id)}>Save</button>
            <button onClick={() => setEditingReview(null)}>Cancel</button>
        </>
    ) : (
        <>
            <p className="rating">Rating: {review.rating} ⭐</p>
            <p>{review.message}</p>
            <p className="timestamp">Posted: {new Date(review.created_at).toLocaleString()}</p>
            {userRole === "patient" && (
                <>
                    <button onClick={() => {
                        setEditingReview(review.id);
                        setEditMessage(review.message);
                    }}>Edit</button>
                    <button onClick={() => handleDelete(review.id)}>Delete</button>
                </>
            )}
        </>
    );
}