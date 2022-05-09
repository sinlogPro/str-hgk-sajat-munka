# mongo-feladat-03
Gyakorlófeladat 03

### Kész feladat beadásának módja:

Jelen repo-ban készíts egy solution.md fájlt és oda másold be a parancsokat, amiket lefuttattál a MongoDB-n!   

### Cursor függvényeinek gyakorlása videoStore adatbázissal   

1. Használd a videoStore adatbázist (az első gyakorló feladatokból)!   
2. Számold meg, hány akció- és romantikus filmed van összesen!   
3. Kérdezd le a „FANTASY” filmek nevét és a kategóriáját. Mentsd le a listát (Cursor-t) egy változóba!   
4. Írj egy ciklust, amely végigiterál a listán, és kiírja filmek a nevét és kategóriáját => példa: Végtelen történet: FANTASY (tipp: print() függvénnyel lehet kiíratni az értékeket Mongo shell-ben)!   
5. Készíts egy lekérdezést, amely fordított sorrendben (_id) adja vissza csak a filmcímeket!   
6. Készíts egy lekérdezést, amely első lépésként a kategóriák szerint rakja sorba az elemeket, majd utána a megjelenés éve szerint fordítva sorolja fel! A lekérdezés csak a film címét, kategóriáját és megjelenési évét adja vissza.   
7. Kérdezd le az ACTION kategóriából a legutóbb készült filmet (szigorúan a query-nek kell megkeresnie, manuálisan kinézni a DB-ből nem ér)!   
8. Kérdezd le az adatbázisból a két legrégebben készült film címét és gyártási évét!   
9. Kérdezd le a ROMANTIC kategóriából a második legfrissebben megjelent film nevét és megjelenési évét!   
10. Készíts egy scriptet egy javaScript fájlban! A script feladata, hogy egyetlen függvényben lekérdezze a mozifilmek számát kimentve egy változóba, majd ennek segítségével egy ciklus keretében 3-asával lapozva írja ki a konzolra a filmek címeit és kategóriáit (kisbetűvel a kategóriát) a következő módon:   
  - pl.: „Terminator : action movie”
  - Minden egyes oldal alján jelenjen meg a szöveg: --page over--!   
   
Segítségül egy lehetséges eredmény:
   
![image](https://user-images.githubusercontent.com/31008444/166239418-05f7b9b8-4390-46e8-90f0-335c413f85cc.png)


