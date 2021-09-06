import React, { useState } from "react";
import { usePostComment } from "../hooks/useApi";

function CommentForm({ review_id, user, setCommentAdded }) {
  const [newComment, setNewComment] = useState("");

  const { postComment } = usePostComment(review_id, user, setCommentAdded);

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(newComment);

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
