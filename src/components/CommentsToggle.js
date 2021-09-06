import React, { useState } from "react";

function CommentsToggle({ children, review, commentAdd }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleOpen}>
        Comments: {review.comment_count + commentAdd}
      </button>
      {isOpen && children}
    </div>
  );
}

export default CommentsToggle;
