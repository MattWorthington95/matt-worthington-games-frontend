import {
  getReviews,
  getUsers,
  getCategories,
  getUserInfo,
  getReviewById,
  getCommentsByReviewId,
  patchVotesByReviewId,
  postCommentByReviewId,
  deleteCommentById,
  patchCommentVoteById,
} from "../api";
import { useEffect, useState, useRef } from "react";

export const useReviews = (page, currentCategory, newSortBy, search) => {
  console.log();
  const [loading, setLoading] = useState(true);
  const [endOfReviews, setEndOfReviews] = useState(false);
  const [reviews, setReviews] = useState("");
  useEffect(() => {
    setLoading(true);

    const requestFunc = async () => {
      try {
        const request = await getReviews(page, newSortBy, search);
        const requestNextPageCheck = await getReviews(
          page + 1,
          newSortBy,
          search
        );
        setReviews(request);
        if (requestNextPageCheck.reviews.length) {
          setEndOfReviews(false);
        } else {
          setEndOfReviews(true);
        }
        setLoading(false);
      } catch (err) {
        console.log(err.response.data);
        setReviews(err.response.data);
        setLoading(false);
      }
    };

    requestFunc();
  }, [page, currentCategory, newSortBy]);

  return { reviews, endOfReviews, loading };
};

export const useUsers = () => {
  const [usersWithInfo, setUsersWithInfo] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  useEffect(() => {
    setUsersLoading(true);
    const requestFunc = async () => {
      const request = await getUsers();

      const usersWithInfo = await Promise.all(
        request.users.map(async (user) => {
          const requestUserInfo = await getUserInfo(user.username);
          return requestUserInfo;
        })
      );

      setUsersWithInfo(usersWithInfo);
      setUsersLoading(false);
    };
    requestFunc();
  }, []);
  return { usersWithInfo, usersLoading };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  useEffect(() => {
    setCatLoading(true);
    const request = async () => {
      const cats = await getCategories();
      setCategories(cats.categories);
      setCatLoading(false);
    };
    request();
  }, []);

  return { categories, setCategories, catLoading };
};

export const useReviewById = (review_id) => {
  const [review, setReview] = useState(null);
  const [reviewLoaded, setReviewLoaded] = useState(true);
  const [commentAdd, setCommentAdded] = useState(0);

  useEffect(() => {
    const requestFunc = async () => {
      try {
        const { review: request } = await getReviewById(review_id);

        setReview(request);
        setReviewLoaded(false);
      } catch (err) {
        setReview({
          status: err.response.status,
          message: err.response.data.message,
        });
        setReviewLoaded(false);
      }
    };
    requestFunc();
  }, [review_id]);

  return { review, reviewLoaded, commentAdd, setCommentAdded };
};

export const useVote = (review_id) => {
  const [voteChange, setVoteChange] = useState(0);

  const incVotes = () => {
    if (voteChange === 0) {
      setVoteChange((currentVoteChange) => {
        return currentVoteChange + 1;
      });

      const requestFunc = async () => {
        try {
          const request = await patchVotesByReviewId(review_id);
          return request;
        } catch (error) {
          console.log(error);
          setVoteChange((currentVoteChange) => {
            return currentVoteChange - 1;
          });
        }
      };
      requestFunc();
    }
  };

  return { voteChange, incVotes };
};

export const useGetComment = (review_id, commentAdd, hasCommentBeenDeleted) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    setCommentsLoading(true);
    const requestFunc = async () => {
      const { comments: requestComments } = await getCommentsByReviewId(
        review_id
      );
      setComments(requestComments);
      setCommentsLoading(false);
      return requestComments;
    };
    requestFunc();
  }, [review_id, commentAdd, hasCommentBeenDeleted]);
  return { comments, commentsLoading };
};

export const usePostComment = (review_id, user, setCommentAdded) => {
  const postComment = (newComment) => {
    const requestFunc = async () => {
      const request = await postCommentByReviewId(review_id, user, newComment);
      setCommentAdded((currentCommentAdded) => {
        return currentCommentAdded + 1;
      });

      return request;
    };
    requestFunc();
  };

  return { postComment };
};

export const useDeleteComment = (setCommentAdded) => {
  const [commentToDelete, setCommentToDelete] = useState("");
  const [hasCommentBeenDeleted, setHasCommentBeenDeleted] = useState(0);
  let initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const requestFunc = async () => {
        const deleteCom = await deleteCommentById(commentToDelete);
        setHasCommentBeenDeleted((current) => current + 1);
        setCommentAdded((current) => current - 1);
      };
      requestFunc();
    }
  }, [commentToDelete]);
  return { hasCommentBeenDeleted, setCommentToDelete };
};

export const usePatchCommentVoteById = () => {
  const [commentToPatch, setCommentToPatch] = useState("");
  let initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const requestFunc = async () => {
        const patchCommentVote = await patchCommentVoteById(commentToPatch);
      };
      requestFunc();
    }
  }, [commentToPatch]);

  return { setCommentToPatch };
};
