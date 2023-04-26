import { getMoviesAdapter } from '../adapters/moviesAdapter'

const API_KEY = '31d642da'

export const getMovies = (search) => {
  if (search === '') return

  return fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    .then((response) => response.json())
    .then((response) => {
      return getMoviesAdapter(response.Search)
    })
    .catch((e) => {
      console.log('TCL: getMovies -> e', e)

      throw new Error('Error searching movies')
    })
}
