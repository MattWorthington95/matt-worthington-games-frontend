import React, { useState } from "react";
import { useComment } from "../hooks/useApi";

function CommentForm({ review_id, user }) {
  const [newComment, setNewComment] = useState("");

  const { postComment } = useComment(review_id, user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newComment);
    postComment(newComment);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Write a Comment:
          <input
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
