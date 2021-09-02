import { useState } from "react";

function AddCommentForm({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={toggleOpen}>Add a Comment</button>
      {isOpen && children}
    </div>
  );
}

export default AddCommentForm;
