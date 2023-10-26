import axios from "axios";
export const getDetail = (mediaType, id) => {
  return axios.get(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=14bdd69ce887376edfafb09f23f78fe9`
  );
};

export const getTrend = () => {
  return axios.get(
    "https://api.themoviedb.org/3/trending/all/day?api_key=14bdd69ce887376edfafb09f23f78fe9"
  );
};

export const getTrendPicks = (keyWord) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=14bdd69ce887376edfafb09f23f78fe9&query=${keyWord}`
  );
};
