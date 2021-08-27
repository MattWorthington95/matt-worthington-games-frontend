import axios from "axios";
const gameReviewApi = axios.create({
  baseURL: "https://matt-worthington-games.herokuapp.com/api",
});

export const getReviews = async (page) => {
  const { data } = await gameReviewApi.get("/reviews", {
    params: { page },
  });
  return data;
};
