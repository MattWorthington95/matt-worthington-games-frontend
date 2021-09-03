import {
  getReviews,
  getUsers,
  getCategories,
  getUserInfo,
  getReviewById,
  getCommentsByReviewId,
  patchVotesByReviewId,
  postCommentByReviewId,
} from "../components/api";
import { useEffect, useState } from "react";

export const useReviews = (page, currentCategory, newSortBy) => {
  const [loading, setLoading] = useState(true);
  const [endOfReviews, setEndOfReviews] = useState(false);
  const [reviews, setReviews] = useState("");
  useEffect(() => {
    setLoading(true);
    const requestFunc = async () => {
      const request = await getReviews(currentCategory, page, newSortBy);
      const requestNextPageCheck = await getReviews(currentCategory, page + 1);

      setReviews(request);

      if (requestNextPageCheck.reviews.length) {
        setEndOfReviews(false);
      } else {
        setEndOfReviews(true);
      }

      setLoading(false);
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
  console.log(review);

  useEffect(() => {
    const requestFunc = async () => {
      try {
        const { review: request } = await getReviewById(review_id);
        console.log(request);
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

  return { review, reviewLoaded };
};

export const useVote = (review_id) => {
  const [voteChange, setVoteChange] = useState(0);

  const incVotes = () => {
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
  };

  return { voteChange, incVotes };
};

export const useGetComment = (review_id, commentAdd) => {
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
  }, [review_id, commentAdd]);
  return { comments, commentsLoading };
};

export const usePostComment = (review_id, user) => {
  const postComment = (newComment) => {
    const requestFunc = async () => {
      const request = await postCommentByReviewId(review_id, user, newComment);
      console.log(request);
      return request;
    };
    requestFunc();
  };

  return { postComment };
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return { matches };
};
