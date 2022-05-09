
(async () => {

  const movies = await db.movies.find();
  const numberOfMovies = await db.movies.find().count();

  movies.toArray().map((movie, idx) => {
    print(movie.title, ':', (movie.category).toLowerCase(), 'movie');
    if ((idx + 1) % 3 === 0) print('--page over---');
  });
  
})();

