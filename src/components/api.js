import axios from "axios";
const gameReviewApi = axios.create({
  baseURL: "https://matt-worthington-games.herokuapp.com/api",
});

export const getReviews = async (currentCategory, page) => {
  const { data } = await gameReviewApi.get("/reviews", {
    params: { page, category: currentCategory },
  });
  return data;
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

// https://matt-worthington-games.herokuapp.com/api/reviews?page=1&category=strategy
