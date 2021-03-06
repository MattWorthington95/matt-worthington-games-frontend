import axios from "axios";
const gameReviewApi = axios.create({
  baseURL: "https://matt-worthington-games.herokuapp.com/api",
});

export const getDefaultUser = async () => {
  const { data } = await gameReviewApi.get("/users/happyamy2016");
  return data;
};

export const getReviews = async (page, newSortBy, search) => {
  let URL = "/reviews";

  if (search) URL += search;

  if (!newSortBy) {
    const { data } = await gameReviewApi.get(URL, {
      params: {
        page,
        search,
      },
    });
    return data;
  } else {
    const { data } = await gameReviewApi.get(`/reviews?sort_by=${newSortBy}`, {
      params: {
        page,
        search,
      },
    });
    return data;
  }
};

export const getUsers = async () => {
  const { data } = await gameReviewApi.get("/users");
  return data;
};

export const getUserInfo = async (username) => {
  const { data } = await gameReviewApi.get(`/users/${username}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await gameReviewApi.get("/categories");
  return data;
};

export const getReviewById = async (singleReview) => {
  const { data } = await gameReviewApi.get(`/reviews/${singleReview}`);
  return data;
};

export const getCommentsByReviewId = async (singleReview) => {
  const { data } = await gameReviewApi.get(`/reviews/${singleReview}/comments`);
  return data;
};

export const patchVotesByReviewId = async (review_id) => {
  const { data } = await gameReviewApi.patch(`/reviews/${review_id}/`, {
    inc_votes: 1,
  });

  return data;
};

export const postCommentByReviewId = async (review_id, user, newComment) => {
  console.log(user.username, newComment);
  const { data } = await gameReviewApi.post(`/reviews/${review_id}/comments`, {
    username: user.username,
    body: newComment,
  });
  console.log(data);

  return data;
};

export const deleteCommentById = async (commentToDelete) => {
  const { data } = await gameReviewApi.delete(`/comments/${commentToDelete}`);
  console.log(data);
};

export const patchCommentVoteById = async (commentToPatch) => {
  await gameReviewApi.patch(`/comments/${commentToPatch}`, {
    inc_votes: 1,
  });
};

//{ inc_votes: 1 }
