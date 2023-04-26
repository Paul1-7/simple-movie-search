import './App.css'
import { CardMovie } from './components/CardMovie'
import { useForm } from './hooks/useForm'
import { useCallback, useEffect, useState } from 'react'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

const initialForm = {
  query: ''
}

function App() {
  const { formValues, handleChange, onSubmit, resetForm } = useForm({
    initialForm
  })
  const [sort, setSort] = useState(false)
  const { hasMovies, getMoviesFetch, movies } = useMovies({
    query: formValues.query,
    sort: sort
  })

  const debounceGetMovies = useCallback(
    debounce((query) => getMoviesFetch({ query }), 300),
    [getMoviesFetch]
  )

  const handleSubmit = ({ query }) => {
    getMoviesFetch(query)
    resetForm()
  }

  useEffect(() => {
    debounceGetMovies(formValues.query)
  }, [formValues])

  const handleSort = () => {
    setSort((sort) => !sort)
  }

  return (
    <div className="flex align-center f-col gap-2">
      <header>
        <h1 className="flex justify-center">Search Movie</h1>
        <form
          className="flex gap-1 justify-center"
          onSubmit={(e) => onSubmit(e, handleSubmit)}
        >
          <input
            type="text"
            name="query"
            onChange={handleChange}
            value={formValues.query}
            placeholder="Avengers, Captain America ..."
          />

          {/* <button type="submit">Search</button> */}
        </form>
        <label className="flex justify-center pt-4">
          Sort by name
          <input type="checkbox" checked={sort} onChange={handleSort} />
        </label>
      </header>
      <h4>
        This is a simple movie search with debounce and hooks such as
        useCallback and useMemo
      </h4>
      <main className="movies">
        {hasMovies ? (
          movies.map((movie) => <CardMovie movie={movie} key={movie.id} />)
        ) : (
          <p className="flex justify-center">No results found</p>
        )}
      </main>
    </div>
  )
}

export default App
