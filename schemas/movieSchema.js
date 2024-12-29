import z from "zod";

const movieSchema = z.object({
  title: z.string(),
  year: z.number().min(1950).max(2024),
  director: z.string(),
  duration: z.number().positive(),
  poster: z.string().url(),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Drama",
      "Sci-Fi",
      "Crime",
      "Romance",
      "Animation",
      "Biography",
      "Fantasy",
    ])
  ),
  rate: z.number().min(0).max(10).default(5.5).optional(),
});

export const validateMovie = (object) => {
  return movieSchema.safeParse(object);
};

export const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object);
};
