import express from "express";
import corsMiddleware from "./middlewares/cors.js";
import router from "./routes/movies.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(corsMiddleware());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    `<blockquote>/movies GET all movies</blockquote>
    <blockquote>/movies?genre=<availableGenres> GET movies by genre</blockquote>
    <blockquote>/movies/:id GET movies by id</blockquote>
    <blockquote>/movies POST new movie</blockquote>
    <blockquote>/movies/:id PATCH movie by id</blockquote>
    <blockquote>/movies/:id DELETE movie by id</blockquote>`
  );
});
app.use("/movies", router);

app.listen(PORT, () => {
  console.log("Server runing http://localhost:".concat(PORT));
});
