import { useState } from "react";
import { useGetComment } from "../hooks/useApi";
import AddCommentForm from "./AddCommentForm";
import CommentForm from "./CommentForm";
import Loader from "react-loader-spinner";

function Comments({ review_id, user }) {
  const [commentAdd, setCommentAdded] = useState(1);
  const { comments, commentsLoading } = useGetComment(review_id, commentAdd);

  if (commentsLoading)
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
    <ul id="review-comments">
      <AddCommentForm>
        <CommentForm
          review_id={review_id}
          user={user}
          setCommentAdded={setCommentAdded}
        />
      </AddCommentForm>

      {comments.map((comment) => {
        return (
          <li key={comment.comment_id}>
            <p>{comment.author} wrote: </p>
            <p>{comment.body}</p>
            <button>Votes: {comment.votes}</button>
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
