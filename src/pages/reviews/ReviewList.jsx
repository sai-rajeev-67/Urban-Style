const ReviewList = ({ reviews }) => {
  return (
    <div className="mt-4">

      <h4>Customer Reviews</h4>

      {reviews.length === 0 ? (
        <p>No Reviews Yet</p>
      ) : (
        reviews.map((review, index) => (
          <div
            key={index}
            className="card p-3 mb-3"
          >
            <h6>
              {review.name}
            </h6>

            <p>
              {"⭐".repeat(
                review.rating
              )}
            </p>

            <p>
              {review.comment}
            </p>

            <small>
              {review.date}
            </small>
          </div>
        ))
      )}

    </div>
  );
};

export default ReviewList;