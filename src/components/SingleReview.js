import { Link, useParams } from "react-router-dom";
import CommentsToggle from "./CommentsToggle";
import "../styles/SingleReview.css";
import { useReviewById, useVote } from "../hooks/useApi";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Comments from "./Comments";

function SingleReview({ user }) {
  const { review_id } = useParams();
  const { review, reviewLoaded } = useReviewById(review_id);
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
      <img src={review.review_img_url} alt="" />
      <h1>{review.title}</h1>
      <p>By {review.owner}</p>
      <p>{review.review_body}</p>
      <button onClick={incVotes}>Votes: {review.votes + voteChange} </button>
      <CommentsToggle review={review}>
        <Comments review_id={review_id} user={user} />
      </CommentsToggle>
    </div>
  );
}

export default SingleReview;
