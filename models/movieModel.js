import require from "../utilities/require.js";
import { randomUUID } from "node:crypto";
const movieJSON = require("./../movies.json");

export class MovieModel {
  static async getAll() {
    return movieJSON;
  }

  static async getById({ id }) {
    const movieIndex = movieJSON.findIndex((mv) => mv.id === id);
    if (movieIndex === -1) return false;
    return movieJSON[movieIndex];
  }

  static async getByGenre({ genre }) {
    if (genre) {
      return movieJSON.filter((mv) => {
        return mv.genre.some((g) => g.toLowerCase() === genre.toLowerCase());
      });
    }
    return movieJSON;
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };
    movieJSON.push(newMovie);
    return movieJSON;
  }

  static async update({ id, input }) {
    const movieIndex = movieJSON.findIndex((mv) => mv.id === id);
    const updatedMovie = {
      ...movieJSON[movieIndex],
      ...input,
    };
    movieJSON[movieIndex] = updatedMovie;
    return updatedMovie;
  }

  static async delete({ id }) {
    const movieIndex = movieJSON.findIndex((mv) => mv.id === id);
    movieJSON.splice(movieIndex, 1);
    return movieJSON;
  }
}
