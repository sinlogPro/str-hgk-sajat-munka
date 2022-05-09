# mongo-feladat-02
Gyakorlófeladat 02

### Kész feladat beadásának módja:   

Jelen repo-ban készíts egy solution.md fájlt és oda másold be a parancsokat, amiket lefuttattál a MongoDB-n!   

### A videoStore feladat folytatása (update, find, projection)   

Normalization elve: Csak a közvetlen összetartozó elemeket tároljuk egy táblázatban (listában). Minél összetettebb egy adat (több tulajdonsággal rendelkezhet, pl.: rendezőnek lehet neve, díjai, filmjei, születési adatai), annál inkább külön listába kell kiszervezni a tárolását.   

1. Készíts el egy „directors” listát, amelyben filmrendezőket fogunk tárolni!   
2. Ments el benne 3 „rendező” dokumentumot az insertOne() parancs segítségével:   
  - "_id": egész szám 1-estől indulva   
  - "name": Steven Spielberg, Clint Eastwood, James Cameron   
  - "birthYear": születési év (tetszőlegesen megadott egész szám)   
  - "movies": kezdetben egy üres lista   

3. Frissítsd a rendezők dokumentumait, helyezd el a „movies” listájukba a megfelelő filmek id-jait (ha ObjectId-t használsz, akkor figyelj arra, hogy ObjectId-ként mentsd el őket). Tipp: kérdezd le a rendezőket, és alájuk listázd a filmeket úgy, hogy csak az id-jük és a rendező nevét adja vissza a lekérdezés:

![image](https://user-images.githubusercontent.com/31008444/166235703-79e12434-6b93-4e7d-8e89-04abf4b38e5d.png)   

4. Ha frissítetted a rendezőket, ellenőrzés gyanánt kérdezd le a dokumentumokat a „directors” listából (használd a pretty() metódust a szebb megjelenítéshez)! Ehhez hasonló eredményt kell látnod:

![image](https://user-images.githubusercontent.com/31008444/166235820-8e2d7726-5092-4272-b9fb-b85db2e17ab2.png)   

5. Ha elkészültél a rendezői listával, frissítsd a movies listát („táblázatot”): távolítsd el a director mezőt ($unset operátor segítségével). Ezentúl a rendezőn keresztül fogjuk elérni a hozzájuk tartozó filmeket.
6. Kérdezd le az egy bizonyos év előtt készült filmeket, majd az egy bizonyos év után készült filmeket! ($gt, $gte, $lt, $lte)
7. Kérdezz le két év között készült filmeket! (Próbáld ki $and operátorral is!)
8. Kérdezz le két év közötti filmeket, amelyek egy bizonyos kategóriával rendelkeznek!
9. Kérdezd le a filmeket, amelyeknek a kategóriája NEM FANTASY ($ne)!
