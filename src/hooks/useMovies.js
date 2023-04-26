import { useCallback, useMemo, useRef, useState } from 'react'
import { getMovies } from '../services/moviesServices'

export function useMovies({ query, sort }) {
  const [movies, setMovies] = useState([])
  const prevSearch = useRef(query)

  const hasMovies = movies?.length > 0

  const getMoviesFetch = useCallback(({ query }) => {
    if (query.length === 0 || prevSearch.current === query) return

    getMovies(query).then((data) => {
      setMovies(() => data)
    })

    prevSearch.current = query
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return {
    hasMovies,
    getMoviesFetch,
    movies: sortedMovies
  }
}
