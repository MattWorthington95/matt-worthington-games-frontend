import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviewById, getCommentsByReviewId } from "./api";
import Comments from "./Comments";
import Reviews from "./Reviews";

function SingleReview({ singleReview, setSingleReview }) {
  const [review, setReview] = useState(null);
  const [reviewLoaded, setReviewLoaded] = useState(true);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const requestFunc = async () => {
      const request = await getReviewById(singleReview);
      const requestComments = await getCommentsByReviewId(singleReview);
      setComments(requestComments);
      console.log(requestComments);
      setReview(request);
      setReviewLoaded(false);
    };
    requestFunc();
  }, []);
  console.log(review);
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
        <ul>
          {comments.comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <p>{comment.body}</p>

                <button>Votes: {comment.votes}</button>
                <p>By: {comment.author}</p>
              </li>
            );
          })}
        </ul>
      </Comments>
    </div>
  );
}

export default SingleReview;
