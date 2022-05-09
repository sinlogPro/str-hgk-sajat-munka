# mongo-feladat-03 - megoldás
Gyakorlófeladat 03

1. Használd a videoStore adatbázist (az első gyakorló feladatokból)!
```js
use videoStore
```

2. Számold meg, hány akció- és romantikus filmed van összesen!
```js
// akció- és romantikus filmek összáma size() metódussal
db.movies.find({ 
  $or: [
    { category: "ACTION" },
    { category: "ROMANTIC" },
  ]
}).size()

// akció- és romantikus filmek összáma count() metódussal
db.movies.find({ 
  $or: [
    { category: "ACTION" },
    { category: "ROMANTIC" },
  ]
}).count()

// akció- és romantikus filmek összáma aggregate és $count használatával
db.movies.aggregate([
  { $match: {
    $or: [
      { category: "ACTION" },
      { category: "ROMANTIC" },
    ]
  }},
  { $count: "categoryCounter" }
])
```


3. Kérdezd le a „FANTASY” filmek nevét és a kategóriáját. Mentsd le a listát (Cursor-t) egy változóba!
```js
var fantasyFilmList = db.movies.find( { category: "FANTASY"}, { _id: 0, title: 1, category: 1 } )
```


4. Írj egy ciklust, amely végigiterál a listán, és kiírja filmek a nevét és kategóriáját => példa: Végtelen történet: FANTASY (tipp: print() függvénnyel lehet kiíratni az értékeket Mongo shell-ben)!
```js
fantasyFilmList.forEach(( movie ) => {
  print(`${movie.title}: ${movie.category}`)
})
```


5. Készíts egy lekérdezést, amely fordított sorrendben (_id) adja vissza csak a filmcímeket!
```js
// sort() metódus használatával
db.movies.find( {}, { _id: 0, title: 1 } ).sort( { title: -1 } )

// aggregate, $sort és $project használatával
db.movies.aggregate([ { $sort: { title: -1 } }, { $project : { _id: 0, title: 1 } } ])

// Csak a filmcímek listázódnak
db.movies.find( {}, { _id: 0, title: 1 } ).sort( { title: -1 } ).forEach( (movie) => print(movie.title) )
```


6. Készíts egy lekérdezést, amely első lépésként a kategóriák szerint rakja sorba az elemeket, majd utána a megjelenés éve szerint fordítva sorolja fel! A lekérdezés csak a film címét, kategóriáját és megjelenési évét adja vissza.
```js
// sort() metódus használatával
db.movies.find( {}, { _id: 0, title: 1, category: 1,  releaseYear: 1} ).sort( { category: 1, releaseYear: 1 } )

// aggregate, $sort és $project használatával
db.movies.aggregate([ { $sort: { category: 1, releaseYear: 1 } }, { $project: { _id: 0, title: 1, category: 1,  releaseYear: 1 } } ])
```


7. Kérdezd le az ACTION kategóriából a legutóbb készült filmet (szigorúan a query-nek kell megkeresnie, manuálisan kinézni a DB-ből nem ér)!
```js
// tömbindex használatával
db.movies.find( { category: "ACTION"} ).sort( { releaseYear: -1 })[0]

// limit() metódussal
db.movies.find( { category: "ACTION"} ).sort( { releaseYear: -1 }).limit(1)
```


8. Kérdezd le az adatbázisból a két legrégebben készült film címét és gyártási évét!
```js
db.movies.find().sort( { releaseYear: 1 } ).limit(2)
```


9. Kérdezd le a ROMANTIC kategóriából a második legfrissebben megjelent film nevét és megjelenési évét!
```js
// tömbindex használatával
db.movies.find( { category: "ROMANTIC" }, { _id: 0, title: 1, releaseYear: 1 } ).sort( { releaseYear: -1 } )[1]

// skip() és limit() metódussal
db.movies.find( { category: "ROMANTIC" }, { _id: 0, title: 1, releaseYear: 1 } ).sort( { releaseYear: -1 } ).skip(1).limit(1)
```


10. Készíts egy scriptet egy javaScript fájlban! A script feladata, hogy egyetlen függvényben lekérdezze a mozifilmek számát kimentve egy változóba, majd ennek segítségével egy ciklus keretében 3-asával lapozva írja ki a konzolra a filmek címeit és kategóriáit (kisbetűvel a kategóriát) a következő módon:
```js
// paging.js
(async () => {

  const movies = await db.movies.find();
  const numberOfMovies = await db.movies.find().count();

  movies.toArray().map((movie, idx) => {
    print(movie.title, ':', (movie.category).toLowerCase(), 'movie');
    if ((idx + 1) % 3 === 0) print('--page over---');
  });
  
})();

// Indítás a MondoDB Shell-ből
load("D:\\SV2\\04_mongo\\gyak-01\\paging.js")
```