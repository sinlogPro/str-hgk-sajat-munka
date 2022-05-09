# mongo-feladat-02 - megoldás
Gyakorlófeladat 02


1. Készíts el egy `directors` listát, amelyben filmrendezőket fogunk tárolni!
2. Ments el benne 3 „rendező” dokumentumot az insertOne() parancs segítségével:   
  - "_id": egész szám 1-estől indulva   
  - "name": Steven Spielberg, Clint Eastwood, James Cameron   
  - "birthYear": születési év (tetszőlegesen megadott egész szám)   
  - "movies": kezdetben egy üres lista  
```js
db.directors.insertOne( { _id: 1,  name: "Steven Spielberg", birthYear: 1930, movies: [] } )
db.directors.insertOne( { _id: 2,  name: "Clint Eastwood", birthYear: 1935, movies: [] } )
db.directors.insertOne( { _id: 3,  name: "James Cameron", birthYear: 1958, movies: [] } )
```


3. Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait (ha ObjectId-t használsz, akkor figyelj arra, hogy ObjectId-ként mentsd el őket). Tipp: kérdezd le a rendezőket, és alájuk listázd a filmeket úgy, hogy csak az id-jük és a rendező nevét adja vissza a lekérdezés:
```js
db.directors.find().forEach(( director ) => {
  const data = db.movies.find( { director: director.name }, { _id:1 } ).toArray().map(item => item._id)
  db.directors.updateOne({ name: director.name }, {$set: { movies: data } })
})
```


4. Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)!
```js
db.directors.find().pretty()
```


5. Ha elkészültél a rendezői listával, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.
```js
db.movies.updateMany( {}, {$unset: { director: "" }} )
```


6. Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)
```js
// A filmek mejelési dátumainak frissítése
db.movies.updateOne( { title: 'Sudden Impact' }, {$set: { releaseYear: 1983 } } )
db.movies.updateOne( { title: 'Indiana Jones and the Temple of Doom' }, {$set: { releaseYear: 1984 } } )
db.movies.updateOne( { title: 'Avatar' }, {$set: { releaseYear: 2009 } } )
db.movies.updateOne( { title: 'The Bridges of Madison County' }, {$set: { releaseYear: 1995 } } )
db.movies.updateOne( { title: 'True Crime' }, {$set: { releaseYear: 1999 } } )
db.movies.updateOne( { title: 'The Terminal' }, {$set: { releaseYear: 2004 } } )
db.movies.updateOne( { title: 'Terminator' }, {$set: { releaseYear: 1984 } } )
db.movies.updateOne( { title: 'Ready Player One' }, {$set: { releaseYear: 2018 } } )
db.movies.updateOne( { title: 'Titanic' }, {$set: { releaseYear: 1997 } } )
db.movies.updateOne( { title: 'Hereafter' }, {$set: { releaseYear: 2010 } } )

// 1999 év előtt készölt filmek kilistázása
db.movies.find( { releaseYear: {$lt: 1999} } )

// 1999 évben és az elött készült filmek kilistázása
db.movies.find( { releaseYear: {$lte: 1999} } )

// 1999 év után készült filmek kilistázása
db.movies.find( { releaseYear: {$gt: 1999} } )

// 1999 évben és az után készült filmek kilistázása
db.movies.find( { releaseYear: {$gte: 1999} } )
```

7. Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)
```js
// 1984 és 2010 között készült filmek listája
// 1984 < releaseYear < 2010, több feltétel egymás utáni megadásával
db.movies.find( { releaseYear: {$gt: 1984, $lt: 2010} } )

// 1984 < releaseYear < 2010, az $and operátor használatával
db.movies.find({
  $and: [
    {releaseYear: {$gt: 1984}},
    {releaseYear: {$lt: 2010}}
  ]
})
```

8. Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!
```js
// lekérdezés feltételek egymás után fűzésével
db.movies.find( { releaseYear: {$gt: 1984, $lt: 2010}, category: "ROMANTIC" } )

// lekérdezés $and operátor használatával
db.movies.find({
  $and: [
    {releaseYear: {$gt: 1984}},
    {releaseYear: {$lt: 2010}},
    {category: "ROMANTIC"}
  ]
})
```


9. Kérdezd le a filmeket, amelyeknek a kategóriája NEM FANTASY ($ne)!
```js
db.movies.find( { category: {$ne: "FANTASY"} } )
```
