export const getMoviesAdapter = (movies) =>
  movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    img: movie.Poster,
    type: movie.Type
  }))
