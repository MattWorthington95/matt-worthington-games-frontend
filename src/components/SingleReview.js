import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { patchVotesByReviewId } from "./api";
import Comments from "./Comments";
import "../styles/SingleReview.css";
import { useReviewById, useVote } from "../hooks/useApi";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AddCommentForm from "./AddCommentForm";
import CommentForm from "./CommentForm";

function SingleReview({ user }) {
  const { review_id } = useParams();
  const { review, reviewLoaded, comments } = useReviewById(review_id);
  const { voteChange, incVotes } = useVote(review_id);

  if (reviewLoaded)
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  return (
    <div id="SingleReview">
      <Link to="/reviews">
        <button>Back</button>
      </Link>
      <p>Inside review</p>
      <img src={review.review.review_img_url} alt="" />
      <h1>{review.review.title}</h1>
      <p>By {review.review.owner}</p>
      <p>{review.review.review_body}</p>
      <button onClick={incVotes}>
        Votes: {review.review.votes + voteChange}{" "}
      </button>
      <Comments review={review}>
        <ul id="review-comments">
          <AddCommentForm>
            <CommentForm review_id={review_id} user={user} />
          </AddCommentForm>
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
