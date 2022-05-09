# mongo-feladat-01 - megoldás
Gyakorlófeladat 01

1. Készíts egy `videoStore` nevű MongoDB adatbázist! 
```js
// A `videoStore` nevű MongoDB adatbázis létrehozása
use videoStore
```

2. Hozz létre benne egy `movies` listát!
3. Ments el benne 10 új filmet (save()) a következő mezőkkel:   
  - _id: legyen generált, ObjectId   
  - title: egy-egy kedvenc film címe, szöveges tartalom   
  - category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet   
  - director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron  
```js
// A `movies` nevű kollekció létrehozása. Kezdeti adatmodell (séma) és a validáció beállítása
db.createCollection("movies", {
  validator: {
    $jsonSchema: {
      properties: {
        title: {bsonType: "string", pattern: "^[A-Z|0-9].*"},
        category: {enum: ["fantasy", "action", "romantic"]},
        director: {bsonType: "string", pattern: "[^A-Z].*"}
      }
    }
  }
});

// Adatbázis feltöltése dokumentumokkal
db.movies.save([
  {title: 'Sudden Impact', category: 'action', director: 'Clint Eastwood'},
  {title: 'Indiana Jones and the Temple of Doom', category: 'action', director: 'Steven Spielberg'},
  {title: 'Avatar', category: 'fantasy', director: 'James Cameron'},
  {title: 'The Bridges of Madison County', category: 'romantic', director: 'Clint Eastwood'},
  {title: 'True Crime', category: 'action', director: 'Clint Eastwood'},
  {title: 'The Terminal', category: 'romantic', director: 'Steven Spielberg'},
  {title: 'Terminator', category: 'action', director: 'James Cameron'},
  {title: 'Ready Player One', category: 'fantasy', director: 'Steven Spielberg'},
  {title: 'Titanic', category: 'romantic', director: 'James Cameron'},
  {title: 'Hereafter', category: 'fantasy', director: 'Clint Eastwood'}  
])
```

4. Frissítsd a listádat (updateMany), mindenki kapjon egy `ratings` mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!
```js
// A `ratings` property hozzáadása a meglévő dokumentumokhoz
db.movies.updateMany( {}, {$set: { ratings: [] }} )


// A meglévő validáció bővítése az újonnan hozzáadott property validációjával
let previousValidator = db.getCollectionInfos({name: "movies"})[0].options.validator;

let newProperty = {
  bsonType: "array",
          items: {
            bsonType: "number", 
            minimum: 1,
            maximum: 5
          }
}

previousValidator.$jsonSchema.properties['ratings'] = newProperty

db.runCommand({
  "collMod": "movies",
  "validator": previousValidator,
});
```

5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a `$push` operátort)!
```js
db.movies.updateOne( {title: 'Sudden Impact'}, {$push: {ratings: 4 }} )
db.movies.updateOne( {title: 'Sudden Impact'}, {$push: {ratings: 3 }} )
db.movies.updateOne( {title: 'Sudden Impact'}, {$push: {ratings: 5 }} )

db.movies.updateOne( {title: 'Terminator'}, {$push: {ratings: 5 }} )
db.movies.updateOne( {title: 'Terminator'}, {$push: {ratings: 4 }} )

db.movies.updateOne( {title: 'Titanic'}, {$push: {ratings: 4 }} )
db.movies.updateOne( {title: 'Titanic'}, {$push: {ratings: 3 }} )
```

6. Adj hozzá minden filmhez egy `releaseYear` (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)! 
```js
db.movies.updateMany( {}, {$set: { releaseYear: 2000 }} )
```

7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!  
```js
// previousValidator = db.getCollectionInfos({name: "movies"})[0].options.validator;

db.runCommand({
  "collMod": "movies",
  "validator": previousValidator,
  "validationLevel": "off"
});

db.movies.updateMany( {}, [{$set: {category: {$toUpper: "$category"}} }] )
```
