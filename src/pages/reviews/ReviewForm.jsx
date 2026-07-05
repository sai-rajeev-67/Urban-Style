import { useState } from "react";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!name || !comment) {
      alert("Fill all fields");
      return;
    }

    const reviews =
      JSON.parse(
        localStorage.getItem("reviews")
      ) || [];

    const newReview = {
      productId,
      name,
      rating,
      comment,
      date:
        new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "reviews",
      JSON.stringify([
        ...reviews,
        newReview,
      ])
    );

    setName("");
    setRating(5);
    setComment("");

    onReviewAdded();
  };

  return (
    <div className="card p-3 mt-4">

      <h4>Write Review</h4>

      <input
        type="text"
        placeholder="Your Name"
        className="form-control mb-2"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <select
        className="form-control mb-2"
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <textarea
        className="form-control mb-2"
        placeholder="Comment"
        rows="3"
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <button
        className="btn btn-dark"
        onClick={handleSubmit}
      >
        Submit Review
      </button>

    </div>
  );
};

export default ReviewForm;