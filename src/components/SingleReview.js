import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviewById, getCommentsByReviewId } from "./api";
import Comments from "./Comments";
import "../styles/SingleReview.css";
import { useReviewById } from "../hooks/useApi";

function SingleReview({ singleReview, setSingleReview }) {
  const { review, reviewLoaded, comments } = useReviewById(singleReview);

  if (reviewLoaded) return <p>Loading...</p>;
  return (
    <div id="SingleReview">
      <Link to="/reviews">
        <button onClick={() => setSingleReview(null)}>Back</button>
      </Link>
      <p>Inside review</p>
      <img src={review.review.review_img_url} alt="" />
      <h1>{review.review.title}</h1>
      <p>By {review.review.owner}</p>
      <p>{review.review.review_body}</p>
      <button>Votes: {review.review.votes}</button>
      <Comments review={review}>
        <ul id="review-comments">
          {comments.comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <p>{comment.author} wrote: </p>
                <p>{comment.body}</p>
                <button>Votes: {comment.votes}</button>
              </li>
            );
          })}
        </ul>
      </Comments>
    </div>
  );
}

export default SingleReview;
