import React, { useState } from "react";
import { usePostComment } from "../hooks/useApi";

function CommentForm({ review_id, user, setCommentAdded }) {
  const [newComment, setNewComment] = useState("");

  const { postComment } = usePostComment(review_id, user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newComment);
    postComment(newComment);
    setCommentAdded((currentCommentAdded) => {
      return currentCommentAdded + 1;
    });
    setNewComment("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Write a Comment:
          <input
            required
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CommentForm;
