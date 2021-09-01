import React, { useState } from "react";
import "../styles/Reviews.css";
import { Link } from "react-router-dom";
import SingleReview from "./SingleReview";
import { useReviews } from "../hooks/useApi";

function Reviews({ currentCategory, singleReview, setSingleReview }) {
  const [page, setPage] = useState(1);
  const { reviews, endOfReviews, loading } = useReviews(page, currentCategory);

  if (loading) return <p>loading...</p>;
  if (singleReview)
    return (
      <SingleReview
        singleReview={singleReview}
        setSingleReview={setSingleReview}
      />
    );

  console.log(reviews);
  return (
    <div className="Reviews">
      {currentCategory ? (
        <h1>{currentCategory} Games</h1>
      ) : (
        <h1>Game Reviews</h1>
      )}
      <ul>
        <div>
          {reviews.reviews.map((review) => {
            return (
              <Link
                onClick={() => {
                  setSingleReview(review.review_id);
                }}
                to={`reviews/${review.review_id}`}
              >
                <li key={review.review_id}>
                  <div>
                    <img src={review.review_img_url} alt="" />
                  </div>
                  <div>
                    <p>{review.title}</p>
                    <p>Posted By {review.owner}</p>
                    <p>Comments: {review.comment_count}</p>
                    <p>Votes: {review.votes}</p>
                  </div>
                </li>
              </Link>
            );
          })}
        </div>
      </ul>
      <div className="page-selector">
        <button
          disabled={page !== 1 ? false : true}
          onClick={() => {
            setPage((currentPage) => {
              return currentPage - 1;
            });
          }}
        >
          Pervious Page
        </button>
        <p>Page {page}</p>
        <button
          disabled={endOfReviews ? true : false}
          onClick={() => {
            setPage((currentPage) => {
              return currentPage + 1;
            });
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Reviews;
