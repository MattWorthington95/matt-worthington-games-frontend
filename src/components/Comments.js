import {
  useDeleteComment,
  useGetComment,
  usePatchCommentVoteById,
} from "../hooks/useApi";
import AddCommentForm from "./AddCommentForm";
import CommentForm from "./CommentForm";
import Loader from "react-loader-spinner";

import SingleComment from "./SingleComment";

function Comments({ review_id, user, commentAdd, setCommentAdded }) {
  const { hasCommentBeenDeleted, setCommentToDelete } =
    useDeleteComment(setCommentAdded);
  const { comments, commentsLoading, setCommentsLoading } = useGetComment(
    review_id,
    commentAdd,
    hasCommentBeenDeleted
  );
  const { setCommentToPatch } = usePatchCommentVoteById();

  if (commentsLoading)
    return (
      <Loader
        type="Puff"
        color="red"
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
          setCommentsLoading={setCommentsLoading}
        />
      </AddCommentForm>

      {comments.map((comment) => {
        return (
          <li key={comment.comment_id}>
            <SingleComment
              comment={comment}
              user={user}
              setCommentToDelete={setCommentToDelete}
              setCommentToPatch={setCommentToPatch}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default Comments;
