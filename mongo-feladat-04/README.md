# mongo-feladat-04
Gyakorlófeladat 04

### Kész feladat beadásának módja:
   
Jelen repo-ban készíts egy solution.md fájlt és oda másold be a parancsokat, amiket lefuttattál a MongoDB-n!

### Listák közötti kapcsolatok, aggregáció gyakorlása, Embed vs. Referencing

Ha egy objektum (dokumentum) egy másik dokumentum egyik mezőjében van, akkor beszélhetünk „embed”, beágyazott dokumentumról.

Használjuk a videoStore adatbázist!

Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:

  - _id: kötelező megadni és csak egész számokból (integer) állhat
  - 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat   
  - 'movies' mező: 'array' lehet és kötelező megadni   
  - 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)   

1. Ha még nem tettük meg, a cinema listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes movies listájához 3 db "_id" értéket a movies listából!
2. Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága!   
3. Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!
4. Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.   
5. Kérdezzük le az egyik rendező által rendezett filmek adatait!
6. Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!   

![image](https://user-images.githubusercontent.com/31008444/166241022-ebca366e-b15c-41e7-a816-d05157e3f6d3.png)
   
7. Adj pár szavazatot egy-egy filmre ("ratings"), ha még nem tetted meg. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!
