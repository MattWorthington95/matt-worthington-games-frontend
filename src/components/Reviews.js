import React, { useState } from "react";
import "../styles/Reviews.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link } from "react-router-dom";
import { useReviews } from "../hooks/useApi";

function Reviews({ currentCategory, singleReview, setSingleReview }) {
  const [page, setPage] = useState(1);
  const { reviews, endOfReviews, loading } = useReviews(page, currentCategory);

  if (loading)
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
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
              <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
                <li>
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
