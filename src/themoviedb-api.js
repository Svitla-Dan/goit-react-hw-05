import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWY2Y2E0NWJmYjg3ZDRlOTVlMWY5ZmRmMmVmMDM3ZCIsIm5iZiI6MTcyOTM4NjgzMi40MjgxMjYsInN1YiI6IjY3MGZlM2U1Y2Y4ZGU4NzdiNDlmNWEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DTDc_KIGog1jJEuoZQ6j_ialOxEQyCueoX44hhWG2yo";

const options = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export async function fetchTrendingMoviesDay() {
  try {
    const response = await axios.get(`/trending/movie/day`, options);
    console.log(response.data);
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch trending movies day: ${response.statusText}`
      );
    }
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies day:", error);
    throw error;
  }
}

export async function fetchTrendingMoviesWeek() {
  try {
    const response = await axios.get(`/trending/movie/week`, options);
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch trending movies week: ${response.statusText}`
      );
    }
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies week:", error);
    throw error;
  }
}

export async function searchMovies(searchQuery, page) {
  const requestOptions = {
    ...options,
    params: {
      query: searchQuery,
      include_adult: "false",
      language: "en-US",
      page: page,
    },
  };
  try {
    const response = await axios.get("/search/movie", requestOptions);
    if (response.status !== 200) {
      throw new Error(`Failed to search movies: ${response.statusText}`);
    }
    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(`/movie/${movieId}`, options);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export async function fetchMovieCredits(movieId) {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`, options);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch movie credits: ${response.statusText}`);
    }
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
}

export async function fetchMovieReviews(movieId) {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`, options);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch movie reviews: ${response.statusText}`);
    }
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
}
