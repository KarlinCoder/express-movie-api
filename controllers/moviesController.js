import { MovieModel } from "../models/movieModel.js";
import require from "../utilities/require.js";
const movieJSON = require("./../movies.json");
import { validateMovie, validatePartialMovie } from "../schemas/movieSchema.js";

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getByGenre({ genre });
    return res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (movie) {
      return res.json(movie);
    }
    return res.status(404).json({ error: "404 Movie Id not found" });
  }

  static async create(req, res) {
    const result = validateMovie(req.body);
    if (!result.error) {
      const newMovie = await MovieModel.create({ input: result.data });
      return res.json(newMovie);
    }
    return res.json({ error: JSON.parse(result.error.message) });
  }

  static async update(req, res) {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);
    if (!result.success)
      return res.json({ error: JSON.parse(result.error.message) });
    const updatedMovie = await MovieModel.update({ id, input: result.data });
    return res.json(updatedMovie);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const movies = await MovieModel.delete({ id });
    return res.json(movies);
  }
}
