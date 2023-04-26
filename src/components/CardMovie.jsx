import PropTypes from 'prop-types'

export const CardMovie = ({ movie }) => {
  return (
    <section key={movie.id} className="movie">
      <img src={movie.img} alt={`image of ${movie.title}`} loading="lazy" />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
    </section>
  )
}

CardMovie.propTypes = {
  movie: PropTypes.object
}
