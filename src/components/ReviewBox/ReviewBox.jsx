import { useEffect, useState } from "react";
import * as reviewAPI from "../../utilities/review-api"
import './ReviewBox.css';


export default function ReviewBox({ doctorId }) {
    const [reviews, setReviews] = useState([]);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);

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
            console.log(newReview)
            setReviews([...reviews, newReview]);
            setMessage('');
            setRating(5);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="review-box">
            <h3>Type your inquiry here!</h3>
            <form onSubmit={handleSubmit} className="review-form">
                <textarea
                    value={message}
                    onChange={(evt) => setMessage(evt.target.value)}
                    required
                    placeholder="Write your inquiry here..."
                />
                <h4>Rate the service here!</h4>
                <select value={rating} onChange={(evt) => setRating(Number(evt.target.value))}>
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

            <div className="review-list">
                <h4>Inquiries</h4>
                {reviews.length === 0 ? (
                    <p>No inquiry yet.</p>
                ) : (
                    reviews.map((r, i) => (
                        <div key={i} className="review">
                            <p className="review-rating"><strong>Rating:</strong> {r.rating} ⭐</p>
                            <p>{r.message}</p>
                            <p><em>Reply:</em> {r.reply || "No reply yet"}</p>
                            <p className="timestamp">Posted: {new Date(r.created_at).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
