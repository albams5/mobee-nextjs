import './movieForm.css'

export const MovieForm = () => {
  return (
    <section className="section-movie-form">
          Rate your movies here:
          <form className="movie-form">
            <label htmlFor="name">Title:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="image">Image:</label>
            <input type="image" id="image" name="image" required />
            <label htmlFor="rating">Score:</label>
            <select id="rating" name="rating">
              <option value="5">10</option>
              <option value="4">9</option>
              <option value="3">8</option>
              <option value="2">7</option>
              <option value="1">6</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            <label htmlFor="genre">Genre:</label>
            <select id="genre" name="genre">
              <option>Drama</option>
              <option>Comedy</option>
            </select>
            <input type="submit" value="Send" />
          </form>
        </section>
  )
}
