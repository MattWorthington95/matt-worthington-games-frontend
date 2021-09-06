import { useState } from "react";

function SingleComment({
  comment,
  user,
  setCommentToDelete,
  setCommentToPatch,
}) {
  const [votesOnCommentId, setVotesOnCommentId] = useState(0);

  console.log(votesOnCommentId);
  return (
    <div>
      <p>{comment.author} wrote: </p>
      <p>{comment.body}</p>
      <button
        onClick={() => {
          if (votesOnCommentId === 0) {
            setVotesOnCommentId((currentVotes) => {
              return currentVotes + 1;
            });
            setCommentToPatch(comment.comment_id);
          }
        }}
      >
        Votes: {comment.votes + votesOnCommentId}
      </button>
      {comment.author === user.username && (
        <button onClick={() => setCommentToDelete(comment.comment_id)}>
          DELETE
        </button>
      )}
    </div>
  );
}

export default SingleComment;
