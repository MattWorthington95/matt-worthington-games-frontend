import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { getReviews } from "./api";
import { Link } from "react-router-dom";
import SingleReview from "./SingleReview";

function Reviews({
  reviews,
  setReviews,
  currentCategory,
  singleReview,
  setSingleReview,
}) {
  const [loading, setLoading] = useState(true);
  const [endOfReviews, setEndOfReviews] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const requestFunc = async () => {
      const request = await getReviews(currentCategory, page);
      const requestNextPageCheck = await getReviews(currentCategory, page + 1);
      console.log(requestNextPageCheck);

      setReviews(request);

      if (requestNextPageCheck.reviews.length) {
        setEndOfReviews(false);
      } else {
        setEndOfReviews(true);
      }

      setLoading(false);
    };
    requestFunc();
  }, [page, currentCategory]);

  if (loading) return <p>loading...</p>;
  if (singleReview)
    return (
      <SingleReview
        singleReview={singleReview}
        setSingleReview={setSingleReview}
      />
    );
  return (
    <div className="Reviews">
      {currentCategory ? (
        <h1>{currentCategory} Games</h1>
      ) : (
        <h1>Game Reviews</h1>
      )}
      <ul>
        {reviews.reviews.map((review) => {
          return (
            <Link
              onClick={() => {
                setSingleReview(review.review_id);
              }}
              to={`review/${review.review_id}`}
            >
              <li key={review.review_id}>
                <img src={review.review_img_url} alt="" />
                <p>{review.title}</p>
                <p>Posted By{review.owner}</p>
                <p>Comments: {review.comment_count}</p>
                <p>Votes: {review.votes}</p>
              </li>
            </Link>
          );
        })}
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
