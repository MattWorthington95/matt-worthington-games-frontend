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

export const useReviews = (page, currentCategory) => {
  const [loading, setLoading] = useState(true);
  const [endOfReviews, setEndOfReviews] = useState(false);
  const [reviews, setReviews] = useState("");
  useEffect(() => {
    setLoading(true);
    const requestFunc = async () => {
      const request = await getReviews(currentCategory, page);
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
  }, [page, currentCategory]);

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
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const requestFunc = async () => {
      const request = await getReviewById(review_id);
      const requestComments = await getCommentsByReviewId(review_id);
      setComments(requestComments);
      setReview(request);
      setReviewLoaded(false);
    };
    requestFunc();
  }, []);

  return { review, reviewLoaded, comments };
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

export const useComment = (review_id, user) => {
  const postComment = (newComment) => {
    console.log(newComment);
    const requestFunc = async () => {
      const request = await postCommentByReviewId(review_id, user, newComment);
      console.log(request);
      return request;
    };
    requestFunc();
  };

  return { postComment };
};
