import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { getReviews } from "./api";

function Reviews({ reviews, setReviews, page, setPage }) {
  const [loading, setLoading] = useState(true);
  const [endOfReviews, setEndOfReviews] = useState(false);

  useEffect(() => {
    const requestFunc = async () => {
      const request = await getReviews(page);
      const requestNextPageCheck = await getReviews(page + 1);
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
  }, [page]);

  console.log(reviews.reviews);
  console.log(page);
  if (loading) return <p>loading...</p>;
  return (
    <div>
      <ul>
        {reviews.reviews.map((review) => {
          return (
            <li>
              <p>{review.title}</p>
              <p>Posted By{review.owner}</p>
              <p>Comments: {review.comment_count}</p>
              <p>Votes: {review.votes}</p>
              <img src={review.review_img_url} alt="" />
            </li>
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
