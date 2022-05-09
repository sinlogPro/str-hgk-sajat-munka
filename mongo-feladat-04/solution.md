# mongo-feladat-04 - megoldás
Gyakorlófeladat 04

### Kész feladat beadásának módja:
   
Jelen repo-ban készíts egy solution.md fájlt és oda másold be a parancsokat, amiket lefuttattál a MongoDB-n!

### Listák közötti kapcsolatok, aggregáció gyakorlása, Embed vs. Referencing

Ha egy objektum (dokumentum) egy másik dokumentum egyik mezőjében van, akkor beszélhetünk „embed”, beágyazott dokumentumról.

Használjuk a `videoStore` adatbázist!
```js
use videoStore
```

Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:

  - _id: kötelező megadni és csak egész számokból (integer) állhat
  - 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat   
  - 'movies' mező: 'array' lehet és kötelező megadni   
  - 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)
```js
db.createCollection("cinemas", {
  validator: {
    $jsonSchema: {
      required: ["_id", "name", "movies", "address"],
      properties: {
        _id: {bsonType: "number"},
        name: {bsonType: "string", pattern: "^[A-Za-z0-9 ]+$"},
        movies: {bsonType: "array"},
        address: {bsonType: "object"}
      }
    }
  }
});

// Meglévő validáció felülírása, ha a kezdeti rosszul sikerült volna
db.runCommand( {
   collMod: "cinemas",
   validator: { $jsonSchema: {
      properties: {
        _id: {bsonType: "number"},
        name: {bsonType: "string", pattern: "^[A-Za-z0-9 ]+$"},
        movies: {bsonType: "array"},
        address: {bsonType: "object"}
      },
      required: ["_id", "name", "movies", "address"]
   } },
   validationLevel: "moderate"
} )
```


1. Ha még nem tettük meg, a `cinema` listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes `movies` listájához 3 db "_id" értéket a `movies` listából!
```js
db.cinemas.insertOne( { _id: 1, name: "Cinema City Alba", movies: [], address: { city: "Székesfehérvár" } } );
db.cinemas.insertOne( { _id: 2, name: "Puskin Mozi", movies: [], address: { city: "Budapest" } } );
db.cinemas.insertOne( { _id: 3, name: "Apollo Mozi", movies: [], address: { city: "Debrecen" } } );

// Mozik filmkínálatlistájának feltöltése
db.cinemas.updateOne( { name: 'Cinema City Alba' }, {$push: {movies: db.movies.find({title: "Titanic"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Cinema City Alba' }, {$push: {movies: db.movies.find({title: "The Terminal"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Cinema City Alba' }, {$push: {movies: db.movies.find({title: "The Bridges of Madison County"},{_id:1}).map(x => x._id)[0] }} )

db.cinemas.updateOne( { name: 'Puskin Mozi' }, {$push: {movies: db.movies.find({title: "Hereafter"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Puskin Mozi' }, {$push: {movies: db.movies.find({title: "Terminator"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Puskin Mozi' }, {$push: {movies: db.movies.find({title: "The Bridges of Madison County"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Puskin Mozi' }, {$push: {movies: db.movies.find({title: "Indiana Jones and the Temple of Doom"},{_id:1}).map(x => x._id)[0] }} )

db.cinemas.updateOne( { name: 'Apollo Mozi' }, {$push: {movies: db.movies.find({title: "Sudden Impact"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Apollo Mozi' }, {$push: {movies: db.movies.find({title: "Avatar"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Apollo Mozi' }, {$push: {movies: db.movies.find({title: "True Crime"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Apollo Mozi' }, {$push: {movies: db.movies.find({title: "Terminator"},{_id:1}).map(x => x._id)[0] }} )
db.cinemas.updateOne( { name: 'Apollo Mozi' }, {$push: {movies: db.movies.find({title: "Ready Player One"},{_id:1}).map(x => x._id)[0] }} )
```

2. Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága! 
```js
db.cinemas.aggregate([   
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "movies"
    }
  },  
  { $limit: 1 }
]).pretty()
```


3. Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!
```js
db.cinemas.aggregate([   
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "movies"
    }
  },
  { $limit: 1 },
  { $project: {_id: 0, movies: 1 } }
]).pretty()
```


4. Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.  
```js
// Már megcsináltam korábban.
```


5. Kérdezzük le az egyik rendező által rendezett filmek adatait!
```js
db.directors.aggregate([   
  { $match: { name: "Clint Eastwood" } },
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "movies"
    }
  },
  { $project: { _id: 0, name: 1, movies: 1 } }
]).pretty()
```


6. Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!   

![image](https://user-images.githubusercontent.com/31008444/166241022-ebca366e-b15c-41e7-a816-d05157e3f6d3.png)
   
```js
db.directors.aggregate([   
  { $match: { name: "James Cameron" } },
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "movies"
    }
  },
  { $project: { _id: 0, name: 1, "movies.title": 1 } }
]).pretty()
```


7. Adj pár szavazatot egy-egy filmre ("ratings"), ha még nem tetted meg. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!
```js
db.movies.aggregate([    
  { $project: { _id: 0, title: 1, rateAvg: { $avg: "$ratings" } }},
  { $sort: { rateAvg: -1 } },
  { $limit: 1 }
])
```
