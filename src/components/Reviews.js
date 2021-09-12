import React, { useState } from "react";
import "../styles/Reviews.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Link, useLocation } from "react-router-dom";
import { useReviews } from "../hooks/useApi";

function Reviews({ currentCategory }) {
  const { search } = useLocation();
  console.log(search);
  const [page, setPage] = useState(1);
  const [newSortBy, setNewSortBy] = useState("");
  const { reviews, endOfReviews, loading } = useReviews(
    page,
    currentCategory,
    newSortBy,
    search
  );

  if (loading)
    return (
      <Loader
        type="Puff"
        color="red"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );

  console.log(reviews);

  if (reviews.message) return <p>{reviews.message}</p>;

  return (
    <div className="Reviews">
      {currentCategory ? (
        <h1>{currentCategory} Games</h1>
      ) : (
        <h1>Game Reviews</h1>
      )}
      <select
        name="sortBy"
        id="sortBy"
        value={newSortBy}
        onChange={(event) => setNewSortBy(event.target.value)}
      >
        <option value="review_id">Newest</option>
        <option value="comment_count">Most Comments</option>
        <option value="votes">Most Votes</option>
      </select>
      <ul>
        {reviews.reviews.map((review) => {
          return (
            <Link to={`/reviews/${review.review_id}`} key={review.review_id}>
              <li>
                <div className="review-image">
                  <img src={review.review_img_url} alt="" />
                </div>
                <div className="review-info">
                  <p id="review-title">{review.title}</p>
                  <p id="review-owner">
                    Posted By <span>{review.owner}</span>
                  </p>
                  <p id="review-votes">
                    <span>{review.votes}</span> votes
                  </p>
                  <p id="review-comment">
                    <span>{review.comment_count}</span> comments
                  </p>
                </div>
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
