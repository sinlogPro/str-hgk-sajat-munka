# mongo-feladat-opcionalis
Gyakorlófeladat opcionális

## 1-es feladathoz

```js
// Opc_1.1  A movies kollekció állapotának visszaállítása az 1. feladat szerinti leírásnak megfelelően
show dbs
use videoStore
show collections
db.movies.find()
db.movies.drop

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

db.movies.updateMany( {}, [{$set: {category: {$toUpper: "$category"}} }] )

db.movies.updateMany( {}, {$set: { ratings: [] }} )


db.movies.updateOne( {title: 'Sudden Impact'}, {$push: {ratings: 4 }} )
db.movies.updateOne( {title: 'Sudden Impact'}, {$push: {ratings: 3 }} )
db.movies.updateOne( {title: 'Sudden Impact'}, {$push: {ratings: 5 }} )

db.movies.updateOne( {title: 'Terminator'}, {$push: {ratings: 5 }} )
db.movies.updateOne( {title: 'Terminator'}, {$push: {ratings: 4 }} )

db.movies.updateOne( {title: 'Titanic'}, {$push: {ratings: 4 }} )
db.movies.updateOne( {title: 'Titanic'}, {$push: {ratings: 3 }} )


db.movies.updateMany( {}, {$set: { releaseYear: 2000 }} )
```

1. Kicsit algoritmizáljunk! Nézd meg, hogy melyik könyvtárban állsz a pwd() parancs segítségével. Hozz létre egy .js kiterjesztésű szöveges fájlt az adott könyvtárban! (Használhatsz majd abszolút elérési utat is később.) Bármilyen szerkesztő, IDEA megfelelő a szerkesztésre. Készíts el benne egy függvényt (ne felejtsd el meghívni a fájl végén), amely tartalmazzon egy listát benne a te filmjeid címeivel (figyelj a pontos címek megadására). 

2. Folytasd a script írását! Cél, hogy mindegyik film különböző éveket kapjon az adatbázisban, de a filmek hármasával egy évtizedben legyenek. Törekedj a funkcionális egyszerű kódra. Futtasd le a Mongo shell-ben a scriptet a load() parancs segítségével. Utána kérdezd le az adatbázisodat ellenőrizni az eredményt.

```js
// Opc_1.setMoviesYear.js
//----------------------------------------
function setYearToMovies() {
  const title = ['Sudden Impact', 'Indiana Jones and the Temple of Doom',
    'Avatar', 'The Bridges of Madison County', 'True Crime', 'The Terminal',
    'Terminator', 'Ready Player One', 'Titanic', 'Hereafter'
  ];

  const year = [1983, 1984, 2009, 1995, 1999, 2004, 1984, 2018, 1997, 2010];

  db.movies.find().forEach( ( movie ) => {
    const index = title.findIndex( item => item === movie.title );
    db.movies.updateOne( { title: movie.title }, { $set: { releaseYear: year[index] } } );
  });

};

setYearToMovies();
//----------------------------------------

// 1.3 A setMoviesYear.js JavaScript kód futtatása a mongo-Shell-ből
load("D:\\SV2\\04_mongo\\gyak-01\\setMoviesYear.js")
```

---
## 2. feladathoz
   
Projection: egy lekérdezés során van, hogy érzékeny adatainkat nem akarjuk elküldeni, vagy csak nincs okunk minden tulajdonságot lekérni egy dokumentumról. A szerveroldalról megjelenített adatok kezelése ezt a célt szolgálja.

1. Írj egy lekérdezést, amely visszaadja az egy konkrét időpont előtt készült filmek címét és kategóriáját (más mező ne jelenjen meg), amelyeknek a kategóriája „ROMANTIC” vagy „ACTION” ($in operátor vagy $or operátor is).

```js
// Opc_2.1  
// Írj egy lekérdezést, amely visszaadja az egy konkrét időpont előtt készült filmek címét
// és kategóriáját (más mező ne jelenjen meg), amelyeknek a kategóriája
// „ROMANTIC” vagy „ACTION” ($in operátor vagy $or operátor is).

// find() metódus használatával
db.movies.find(
  {
    releaseYear: { $lt: 2000 },
    $or: [ { category: "ACTION" }, { category: "ROMANTIC" }, ]
  },
  { _id:0, title: 1, category: 1 }
);

// aggregate() metódus használatával
db.movies.aggregate([
  { $match: {
      releaseYear: { $lt: 2000 },
      $or: [ { category: "ACTION" }, { category: "ROMANTIC" }, ]
  }},
  { $project : { _id: 0, title: 1, category: 1 } }
]);
```

2. Írj egy lekérdezést a directors listára, amelyben elkéred a rendezők nevét és a filmek _id-ját (más mező ne jelenjen meg).
```js
// Opc_2.2
// Írj egy lekérdezést a directors listára, amelyben elkéred a rendezők
// nevét és a filmek _id-ját (más mező ne jelenjen meg).
db.directors.find( {}, { _id: 0, name: 1, movies: 1 })
```


3. Írj egy lekérdezést, amely visszaadja a Steven Spielberg filmrendező által rendezett filmek adatait, kivéve a ratings-et. (Most elég, ha lekérdezed először a rendező film id-jait, majd a fő lekérdezésben megadott paraméterként az id-kat).

```js
// Opc_2.3
// Írj egy lekérdezést, amely visszaadja a Steven Spielberg filmrendező által 
// rendezett filmek adatait, kivéve a ratings-et. (Most elég, ha lekérdezed először
// a rendező film id-jait, majd a fő lekérdezésben megadott paraméterként az id-kat).

// A filmcímekre való hivatkozáshoz az idegen kulcsok frissítése
db.directors.updateMany( {}, { $unset: { movies: [] } })
db.directors.updateMany( {}, { $set: { movies: [] } })

db.directors.find().forEach( ( director ) => {
  const data = db.movies.find( { director: director.name }, { _id:1 } ).toArray().map( item => item._id )
  db.directors.updateOne( { name: director.name }, {$set: { movies: data } } )
})

// A feladat megoldása
db.directors.aggregate([   
  { $match: { name: "Steven Spielberg" } },
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      pipeline: [
        { $project: { _id: 0, title: 1, category: 1, releaseYear: 1 } }
      ],
      as: "movies"
    }
  },
  { $project: { _id: 0, name: 1, movies: 1 } }
]).pretty()
```


### Adatbázis importálása .json fájlból

```js
/ Adatbázis importálása .json fájlból
// parancs a terminálban (cmd-ben)
mongoimport --db newdb --collection restaurants --file D:\SV2\04_mongo\gyak-01\primer-dataset.json

// Annak ellenőrzése, hogy az inportálás sikerült
use newdb
show collections
db.restaurants.count()
```


### Gyakorlás nagyobb tömegű adatokon

1. Kérdezzük le a restaurants listánkból a Brooklyn kerületben („borough”) lévő éttermek neveit, címét és kerületét. Az egyedi azonosító ne jelenjen meg! Használjuk a pretty() parancsot az olvashatóbb megjelenítéshez!
```js
// 1. Kérdezzük le a restaurants listánkból a Brooklyn kerületben („borough”) lévő éttermek neveit, címét és kerületét.
//    Az egyedi azonosító ne jelenjen meg! Használjuk a pretty() parancsot az olvashatóbb megjelenítéshez!
db.restaurants.find( { borough: "Brooklyn" }, { _id: 0, name: 1, address: 1, borough: 1 } ).pretty()
```

2. Kérdezd le a Queens kerületben lévő olyan éttermek neveit, kerületét és a kapott osztályzatait („grades”), amelyeknek a nevében benne van a „Kitchen” szó (tipp: használd a $regex operátort)!
```js
// 2. Kérdezd le a Queens kerületben lévő olyan éttermek neveit, kerületét és a kapott osztályzatait
//    („grades”), amelyeknek a nevében benne van a „Kitchen” szó (tipp: használd a $regex operátort)!
db.restaurants.find( { borough: "Queens", name: { $regex:/Kitchen/i } }, { _id: 0, name: 1, borough: 1, grades: 1 } ).pretty()
```

3. Ellenőrzés gyanánt számold meg, hány darab van belőlük! Ismételd meg a fenti parancsot, a pretty() parancs helyet használd a count() parancsot! 144 étteremnek kell lennie.
```js
// 3. Ellenőrzés gyanánt számold meg, hány darab van belőlük! Ismételd meg a fenti parancsot, a pretty()
//    parancs helyet használd a count() parancsot! 144 étteremnek kell lennie.
db.restaurants.find( { borough: "Queens", name: { $regex:/Kitchen/i } }, { _id: 0, name: 1, borough: 1, grades: 1 } ).count()
db.restaurants.find( { borough: "Queens", name: { $regex:/Kitchen/i } }, { _id: 0, name: 1, borough: 1, grades: 1 } ).size()
```

4. Kérdezd le azokat az éttermeket, amelyeknek a konyhája („cuisine”) NEM amerikai és az Astoria Boulevard utcában vannak. A szerver csak a cuisine és az address mezőket adja vissza.
```js
// 4. Kérdezd le azokat az éttermeket, amelyeknek a konyhája („cuisine”) NEM amerikai és az
//    Astoria Boulevard utcában vannak. A szerver csak a cuisine és az address mezőket adja vissza.
db.restaurants.find( { cuisine: {$ne: "American" }, "address.street": "Astoria Boulevard" }, { _id: 0, cuisine: 1, address: 1 } )
```

5. Kérdezd le azokat az éttermeket, amelyek pizzát („pizza”) árulnak és NEM a következő kerületekben vannak: Brooklyn, Queens, Manhattan!   
```js
// 5. Kérdezd le azokat az éttermeket, amelyek pizzát („pizza”) árulnak
//    és NEM a következő kerületekben vannak: Brooklyn, Queens, Manhattan!
db.restaurants.find( { cuisine: {$regex:/pizza/i }, borough: {$nin: ["Brooklyn", "Queens", "Manhattan"] } }, { _id: 0, cuisine: 1, borough: 1 } )
```

6. Kérdezd le azoknak az éttermeknek a címét és nevét, amelyeknek a nevében benne van a „Pizza” szó és az irányítószámuk: 11369!
```js
// 6. Kérdezd le azoknak az éttermeknek a címét és nevét, amelyeknek a nevében benne van a „Pizza”
//    szó és az irányítószámuk: 11369!
db.restaurants.find( { name: { $regex:/Pizza/ }, "address.zipcode": "11369" }, { _id: 0, name: 1, address: 1 } )
```

7. Számold meg, hány „Tony”-val kezdődő névvel rendelkező étterem van az adatbázisban! (40 db a helyes válasz)
```js
// 7. Számold meg, hány „Tony”-val kezdődő névvel rendelkező étterem van az adatbázisban!
//    (40 db a helyes válasz)
db.restaurants.find( { name: { $regex:/^Tony/ } } ).count()
// A helyes eredményt nem 40, hanem 32.
// Akkor kapunk eredményül 40-et, ha a "Tony"-t nem kezdőnévvel, hanem mindenhol keressük
db.restaurants.find( { name: { $regex:/Tony/ } } ).count()
```

---
## 3-as feladathoz
### Gyakorlás a „restaurants” listán

1. Ha még nem tetted meg, telepítsd a „restaurants” listát a 2. feladat leírásában található („Adatbázis importálása .json fájlból”) feladat alapján. 
```js
// Korábban megcsinálva.
```


2. Kérdezd le a Queens kerületben lévő éttermek nevét fordított sorrendben!
```js
// 2. Kérdezd le a Queens kerületben lévő éttermek nevét fordított sorrendben!
// megoldás .aggregate() metódussal
db.restaurants.aggregate([ 
  { $match: { borough: "Queens" } },
  { $sort: { name: -1 } },
  { $project: {_id: 0, name: 1 } }
  ]);

// megoldás .find() metódussal
db.restaurants.find( { borough: "Queens" }, { _id: 0, name: 1 } ).sort( {name: -1} )
```

3. Kérdezd le a Brooklynban mexikói konyhával rendelkező éttermek nevét és címét, nevük szerinti sorrendben!
```js
// 3. Kérdezd le a Brooklynban mexikói konyhával rendelkező éttermek nevét és címét,
//    nevük szerinti sorrendben!
db.restaurants.find( { borough: "Brooklyn", cuisine: "Mexican" }, { _id: 0, name: 1, address: 1 } ).sort( { name: 1 } )
```

4. Kérdezd le a Queens-ben lévő olasz konyhával rendelkező éttermek nevét, amelyek bármelyik körúton („Boulevard”) megtalálhatóak.
```js
// 4. Kérdezd le a Queens-ben lévő olasz konyhával rendelkező éttermek nevét,
//    amelyek bármelyik körúton („Boulevard”) megtalálhatóak.
db.restaurants.find( { borough: "Queens", cuisine: "Italian", "address.street": { $regex:/Boulevard/ } }, { _id: 0, name: 1 } )
```

5. Hány darab olasz étterem van Manhattan-ben? (510 lesz a helyes válasz.)
```js
// 5. Hány darab olasz étterem van Manhattan-ben? (510 lesz a helyes válasz.)
db.restaurants.find( { borough: "Manhattan", cuisine: "Italian" } ).count()
// Az eredmény 612, és nem 510.
```

6. Jelenítsd meg a Bronxban található ír éttermek neveit és konyhájának típusát, név szerinti fordított sorrendben!
```js
// 6. Jelenítsd meg a Bronxban található ír éttermek neveit és konyhájának
//    típusát, név szerinti fordított sorrendben!
db.restaurants.find( { borough: "Bronx", cuisine: "Irish" }, { _id: 0, name: 1, cuisine: 1 } ).sort( { name: -1} )
```

7. Kérdezd le a Queens-ben található éttermek neveit és címét, amelyek a Queens Boulevard-on vannak, a házszámban nincs "-" jel, a házszámok szerinti növekvő sorrendben. (String-ként tárolja az adatbázis, de most elég csak string szerinti sorrendben kiíratni a házszámokat.)
```js
// 7. Kérdezd le a Queens-ben található éttermek neveit és címét, amelyek a Queens Boulevard-on
//    vannak, a házszámban nincs "-" jel, a házszámok szerinti növekvő sorrendben. (String-ként tárolja
//    az adatbázis, de most elég csak string szerinti sorrendben kiíratni a házszámokat.)
db.restaurants.find( { borough: "Queens", "address.street": { $regex:/Queens Boulevard/ } }, { _id: 0, name: 1, "address.street": 1, "address.building": 1} ).sort( { "address.building": 1} )
```

8. Kérdezd le Bronx éttermeit, amelyek NEM olasz vagy kínai konyhával rendelkeznek!
```js
// 8. Kérdezd le Bronx éttermeit, amelyek NEM olasz vagy kínai konyhával rendelkeznek!
db.restaurants.find( { borough: "Bronx", $nor: [ { cuisine: { $regex:/Italian/ } }, { cuisine: { $regex:/Chinese/ } } ] }, { _id: 0, borough: 1, cuisine: 1, name: 1 } )
```

9. Kérdezd le a legnagyobb irányítószámmal rendelkező étterem nevét, konyháját és címét, amely Queens-ben található!
```js
// 9. Kérdezd le a legnagyobb irányítószámmal rendelkező étterem nevét, konyháját és címét, amely Queens-ben található!
db.restaurants.find( { borough: "Queens" }, { _id: 0, "address.zipcode": 1, name: 1 } ).sort({ "address.zipcode": -1 }).limit(1)

// Az irányítószámot számmá alakítjuk és csökkenő sorba rendezve az első elem a legnagyobb
db.restaurants.find( { borough: "Queens" } ).toArray().map( item => item.address.zipcode * 1 ).sort( (a, b) => b - a )[0]
// 11697
```

10. Kérdezd le az 5. legnagyobb irányítószámmal rendelkező étterem nevét és címét! (11694-et várunk.)
```js
// 10. Kérdezd le az 5. legnagyobb irányítószámmal rendelkező étterem nevét és címét! (11694-et várunk.)
db.restaurants.find( { borough: "Queens" } ).toArray().map( item => item.address.zipcode * 1 ).sort( (a, b) => b - a )[4]
// 11694

db.restaurants.find( {}, { _id: 0, "address.zipcode": 1, name: 1 } ).sort({ "address.zipcode": -1 }).skip(4).limit(1)
```
   
Bónusz feladatok:
1. Kérdezd le és jelenítsd meg a konyhák típusait Manhattanban! (Minden típus egyszer jelenjen meg!) => tipp: distinct használata
```js
// 11. Kérdezd le és jelenítsd meg a konyhák típusait Manhattanban! (Minden típus egyszer jelenjen meg!)
//     => tipp: distinct használata
db.restaurants.distinct( "cuisine", { borough: "Manhattan" } )
```

2. Az aggregáció és project segítségével kérdezd le a Bronxban található amerikai konyhával rendelkező éttermek nevét, konyhatípusát, kerületnevét, és egy „countOfGrades” nevű mező adja vissza, hogy hány darab szavazatot kaptak az egyes éttermek:
```js
// 12. Az aggregáció és project segítségével kérdezd le a Bronxban található amerikai konyhával
//     rendelkező éttermek nevét, konyhatípusát, kerületnevét, és egy „countOfGrades” nevű mező adja
//     vissza, hogy hány darab szavazatot kaptak az egyes éttermek:
db.restaurants.aggregate([ 
  { $match: { 
      borough: "Bronx",
      cuisine: "American"
    }
  },
  { $project: {
      name: 1,
      borough: 1,
      cuisine: 1,
      countOfGrades: {$size: "$grades"}
    }
  }
]).pretty();
```


---
## 4-es feladathoz
### Validátorok létrehozásának gyakorlása

1. Használjuk a videoStore adatbázist!
```js
// 1. Használjuk a videoStore adatbázist!
use videoStore
```

2. Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:
  - _id: kötelező megadni és csak egész számokból (integer) állhat   
  - 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat   
  - 'movies' mező: 'array' lehet és kötelező megadni   
  - 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)
```js
// 2. Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:
//    _id: kötelező megadni és csak egész számokból (integer) állhat
//    'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat
//    'movies' mező: 'array' lehet és kötelező megadni
//    'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)

// Validáció módosítása. Korábbi validációnál az _id number típusú volt.
db.runCommand( {
   collMod: "cinemas",
   validator: { $jsonSchema: {
      properties: {
        _id: {bsonType: "int"},
        name: {bsonType: "string", pattern: "^[A-Za-z0-9 ]+$"},
        movies: {bsonType: "array"},
        address: {bsonType: "object"}
      },
      required: ["_id", "name", "movies", "address"]
   } },
   validationLevel: "moderate"
} )
```

3. Végezzünk el pár próbamentést az alábbi adatokkal! A lényeg, hogy egyik adatnak sem szabad(na) elmentésre kerülnie:
  - _id:NumberInt(1), name: "Cinema!", movies:[], address: {city:"Budapest"}   
  - name: "Cinema", movies:[], address: {city:"Budapest"},   
  - _id:NumberInt(1), name: "Cinema", movies: "Titanic", address: {city:"Budapest"},   
  - _id:NumberInt(1), name:"Cinema", address: {city:"Budapest"},   
  - _id:NumberInt(1), name: "Cinema", movies:[], address: "Budapest",   
  - _id:NumberInt(1), name:"Cinema", movies:[]   
```js
// 3. Végezzünk el pár próbamentést az alábbi adatokkal! A lényeg, hogy egyik adatnak sem szabad(na) elmentésre kerülnie:
//    _id:NumberInt(1), name: "Cinema!", movies:[], address: {city:"Budapest"}
//    name: "Cinema", movies:[], address: {city:"Budapest"},
//    _id:NumberInt(1), name: "Cinema", movies: "Titanic", address: {city:"Budapest"},
//    _id:NumberInt(1), name:"Cinema", address: {city:"Budapest"},
//    _id:NumberInt(1), name: "Cinema", movies:[], address: "Budapest",
//    _id:NumberInt(1), name:"Cinema", movies:[]

// Probák, és az elvártaknak megfelelően, nem fogadja el a mongoDB
db.cinemas.insertOne( { _id:NumberInt(1), name: "Cinema!", movies:[], address: {city:"Budapest"} })
db.cinemas.insertOne( { name: "Cinema", movies:[], address: {city:"Budapest"} })
db.cinemas.insertOne( { _id:NumberInt(1), name: "Cinema", movies: "Titanic", address: {city:"Budapest"} })
db.cinemas.insertOne( { _id:NumberInt(1), name:"Cinema", address: {city:"Budapest"} })
db.cinemas.insertOne( { _id:NumberInt(1), name: "Cinema", movies:[], address: "Budapest" })
db.cinemas.insertOne( { _id:NumberInt(1), name:"Cinema", movies:[] })
```

4. Most megfelelő adatokkal mentsünk el 3 mozi dokumentumot:
  - pl.: _id: NumberInt(1), name: "Cinema Mompark", movies:[], address: {city:"Budapest"}...   
  - Adjunk hozzá az egyik dokumentum „movies” listájához egy tetszőleges mozifilm id-t (amely létezik a „movies” collection-ben)!
```js
// 4. Most megfelelő adatokkal mentsünk el 3 mozi dokumentumot:
//    pl.: _id: NumberInt(1), name: "Cinema Mompark", movies:[], address: {city:"Budapest"}...
//    Adjunk hozzá az egyik dokumentum „movies” listájához egy tetszőleges mozifilm id-t (amely létezik a „movies” collection-ben)!
db.cinemas.insertOne( { _id: NumberInt(4), name: "Cinema Mompark", movies:[], address: {city:"Budapest"} })
db.cinemas.updateOne( { name: 'Cinema Mompark' }, {$push: {movies: ObjectId("627e1638714eeeabab5e099c") }} )
```

5. Ellenőrizzük, hogy amikor update-elni akarjuk a mozi egy-egy sorát, nem engedi a validátorunk:   
  - Próbáljuk átírni a mozi nevét, hogy egy speciális karaktert tartalmazzon! Cinema Mompark => %Cinema MomPark   
  - Frissítsük az egyik dokumentumot úgy, hogy a movies listát próbáljuk lecserélni egy sima filmcímre!   
  - Próbáljuk meg eltávolítani az "address" mezőt!   
  - Próbáljuk eltávolítani a "movies" mezőt!   
Egyik sem működhet a validátor használata során.
```js
// 5. Ellenőrizzük, hogy amikor update-elni akarjuk a mozi egy-egy sorát, nem engedi a validátorunk:

// Próbáljuk átírni a mozi nevét, hogy egy speciális karaktert tartalmazzon! Cinema Mompark => %Cinema MomPark
db.cinemas.updateOne( { name: "Cinema Mompark" }, { $set: { name: "%Cinema Mompark" } })

// Frissítsük az egyik dokumentumot úgy, hogy a movies listát próbáljuk lecserélni egy sima filmcímre!
db.cinemas.updateOne( { name: "Cinema Mompark" }, { $set: { movies: "Terminator" } })

// Próbáljuk meg eltávolítani az "address" mezőt!
db.cinemas.updateOne( { name: "Cinema Mompark" }, { $unset: { address: "" } })

// Próbáljuk eltávolítani a "movies" mezőt!
db.cinemas.updateOne( { name: "Cinema Mompark" }, { $unset: { movies: [] } })

// Egyik sem működhet a validátor használata során.
// IGEN - Valóban nem működött egyik parancs sem. A validátor megakadályozta a módosításokat.
```
