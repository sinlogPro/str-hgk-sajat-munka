# mongo-feladat-01
Gyakorlófeladat 01

### Kész feladat beadásának módja:

Jelen repo-ban készíts egy solution.md fájlt és oda másold be a parancsokat, amiket lefuttattál a MongoDB-n!
   
### MongoDB alapfeladatok terminálban (Mongo shell-ben)
   
Elsőként olvasd végig az összes pontot!   

1. Készíts egy videoStore nevű MongoDB adatbázist!   
2. Hozz létre benne egy movies listát!   
3. Ments el benne 10 új filmet (save()) a következő mezőkkel:   
  - _id: legyen generált, ObjectId   
  - title: egy-egy kedvenc film címe, szöveges tartalom   
  - category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet   
  - director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron   

4. Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!   
5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!   
6. Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!   
7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!   

Tipp: db.courses.updateMany( {}, [{$set: {title: {$toUpper: "$title"} }}] )
