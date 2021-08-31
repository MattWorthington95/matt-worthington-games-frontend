import React, { useState } from "react";

function Comments({ children, review }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleOpen}>
        Comments: {review.review.comment_count}
      </button>
      {isOpen && children}
    </div>
  );
}

export default Comments;
