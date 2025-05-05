import * as reviewAPI from "../../utilities/review-api";
export default function ReviewReply({ review, reviews, handleSubmit, setReviews, userRole, editingReply, setEditingReply, replyMessage, setReplyMessage }) {

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
        <>
            {userRole === "doctor" && editingReply === review.id ? (
                <>
                    <form onSubmit={handleSubmit} className="reply-form">
                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            required
                            placeholder="Write your reply here..."
                        />
                        <div className="submit-button-wrapper">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                    />
                    <button onClick={() => handleReplyEdit(review.id)}>Save Reply</button>
                    <button onClick={() => setEditingReply(null)}>Cancel</button>
                </>
            ) : (
                <>

                    <h3>Reply:</h3>
                    <p>{review.reply || "No reply yet"}</p>
                        <p className="timestamp">Posted: {new Date(review.created_at).toLocaleString()}</p>

                    {userRole === "doctor" && (
                        <>
                            <button onClick={() => {
                                setEditingReply(review.id);
                                setReplyMessage(review.reply || "");
                            }}>
                                Edit Reply
                            </button>
                            <button onClick={() => handleReplyDelete(review.id)}>Delete Reply</button>
                        </>
                    )}
                </>
            )}

            
        </>
    );
}