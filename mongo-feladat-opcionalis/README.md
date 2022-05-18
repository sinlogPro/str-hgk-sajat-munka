# mongo-feladat-opcionalis
Gyakorlófeladat opcionális

### Kész feladat beadásának módja:
   
Jelen repo-ban készíts egy solution.md fájlt és oda másold be a parancsokat, amiket lefuttattál a MongoDB-n!


## 1-es feladathoz

Kérdezd le az adatokat, hogy ellenőrizd, sikeresek lettek-e a frissítések! Most így kellene kinéznie a listának:

![image](https://user-images.githubusercontent.com/31008444/166243997-7f9f83d0-4f48-4036-a738-a7236f98ebed.png)
   
1. Kicsit algoritmizáljunk! Nézd meg, hogy melyik könyvtárban állsz a pwd() parancs segítségével. Hozz létre egy .js kiterjesztésű szöveges fájlt az adott könyvtárban! (Használhatsz majd abszolút elérési utat is később.) Bármilyen szerkesztő, IDEA megfelelő a szerkesztésre. Készíts el benne egy függvényt (ne felejtsd el meghívni a fájl végén), amely tartalmazzon egy listát benne a te filmjeid címeivel (figyelj a pontos címek megadására). Kiindulásként egy kis „segédkép”:

![image](https://user-images.githubusercontent.com/31008444/166244106-8debc52c-f109-42d6-8d7b-f5d6d73c4872.png)
   
2. Folytasd a script írását! Cél, hogy mindegyik film különböző éveket kapjon az adatbázisban, de a filmek hármasával egy évtizedben legyenek. Törekedj a funkcionális egyszerű kódra. Futtasd le a Mongo shell-ben a scriptet a load() parancs segítségével. Utána kérdezd le az adatbázisodat ellenőrizni az eredményt. Íme egy lehetséges elvárt eredmény:

![image](https://user-images.githubusercontent.com/31008444/166244163-fce81889-a518-435d-86cd-a4628ca11ced.png)
   
## 2. feladathoz
   
Projection: egy lekérdezés során van, hogy érzékeny adatainkat nem akarjuk elküldeni, vagy csak nincs okunk minden tulajdonságot lekérni egy dokumentumról. A szerveroldalról megjelenített adatok kezelése ezt a célt szolgálja.

1. Írj egy lekérdezést, amely visszaadja az egy konkrét időpont előtt készült filmek címét és kategóriáját (más mező ne jelenjen meg), amelyeknek a kategóriája „ROMANTIC” vagy „ACTION” ($in operátor vagy $or operátor is).
2. Írj egy lekérdezést a directors listára, amelyben elkéred a rendezők nevét és a filmek _id-ját (más mező ne jelenjen meg).   
3. Írj egy lekérdezést, amely visszaadja a Steven Spielberg filmrendező által rendezett filmek adatait, kivéve a ratings-et. (Most elég, ha lekérdezed először a rendező film id-jait, majd a fő lekérdezésben megadott paraméterként az id-kat).

#### Adatbázis importálása .json fájlból

Adatbázisokkal történő munkák során gyakran előfordulhat, hogy biztonsági mentéseket kell végezni vagy különböző fájlokból kell importálni adatbázisba adatokat. Ehhez az egyik fő eszköz a „MongoDB DataBase Tool”, azon belül most a mongoimport segítségével fogunk gyakorolni.

DataBase Tool: külön package-ben kell telepíteni a MongoDB egy újabb verziója óta. (Windows esetén érdemes lehet a MongoDB könyvtára „közelébe vagy mellé” telepíteni.)

Windows: https://docs.mongodb.com/database-tools/installation/installation-windows/

Ubuntu: https://docs.mongodb.com/database-tools/installation/installation-linux/

Mac: https://docs.mongodb.com/database-tools/installation/installation-macos/

Ellenőrizzük, hogy sikeresen települt:

Ubuntu, Mac => parancs a terminálban (nem a Mongo shell-ben): mongoimport --version

Windows => meg kell keresnünk a terminálban a telepítés helyét, lépjünk be a bin könyvtárba, hogy lássuk a települt fájlokat. (Itt is futtatható már a mongoimport --version parancs.)

![image](https://user-images.githubusercontent.com/31008444/166244530-0c23614f-5749-46e0-aed6-08ffa01305e6.png)
    
mongoimport parancs segítségével tudunk CSV, JSON fájlból importálni adatbázist.

1. Ubuntun a terminálban (nem Mongo shell-ben!). Keressünk egy könyvtárat, ahová el akarjuk menteni az adatbázist, majd a terminálban írjuk be az alábbi parancsot:   
wget https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json

WINDOWS estén keressük fel az oldalt: majd az oldalon jobb egér klikk, mentés másként, hogy lementsük a tartalmat.

2. Utána mehet a parancs a terminálokban:   
Ubuntu: sudo mongoimport --db newdb --collection restaurants --file primer-dataset.json

Windows: meg kell keresni a DataBase Tool forrás könyvtárát, és ott mehet a parancs:

![image](https://user-images.githubusercontent.com/31008444/166244785-d1c01176-6d6c-4750-b492-3bb439488443.png)
   
Parancsok:

  - mongoimport: importálj adatokat a MongoDB szerverre
  - --db "newdb": a newdb nevű adatbázisba (ha nincs ilyen a gépen, létrehozza)
  - --collections restaurant: a „restaurants” listába mentse az adatokat
  - --file primer-dataset.json: a primer-dataset.json fájlból
Megjegyzés: a parancs végére a relatív vagy teljes elérési utat kell írni, ha más könyvtárban lenne a .json fájl.

3. Ellenőrizzük parancsokkal, hogy sikerült-e az import:
  - use newdb
  - db.restaurants.count() (számolja meg, hány elemünk van)

![image](https://user-images.githubusercontent.com/31008444/166245021-5ef423d0-cbd3-40af-b225-f1370fe04f68.png)
   
#### Gyakorlás nagyobb tömegű adatokon

1. Kérdezzük le a restaurants listánkból a Brooklyn kerületben („borough”) lévő éttermek neveit, címét és kerületét. Az egyedi azonosító ne jelenjen meg! Használjuk a pretty() parancsot az olvashatóbb megjelenítéshez!   
2. Kérdezd le a Queens kerületben lévő olyan éttermek neveit, kerületét és a kapott osztályzatait („grades”), amelyeknek a nevében benne van a „Kitchen” szó (tipp: használd a $regex operátort)!   
3. Ellenőrzés gyanánt számold meg, hány darab van belőlük! Ismételd meg a fenti parancsot, a pretty() parancs helyet használd a count() parancsot! 144 étteremnek kell lennie.   
4. Kérdezd le azokat az éttermeket, amelyeknek a konyhája („cuisine”) NEM amerikai és az Astoria Boulevard utcában vannak. A szerver csak a cuisine és az address mezőket adja vissza.   
5. Kérdezd le azokat az éttermeket, amelyek pizzát („pizza”) árulnak és NEM a következő kerületekben vannak: Brooklyn, Queens, Manhattan!   
6. Kérdezd le azoknak az éttermeknek a címét és nevét, amelyeknek a nevében benne van a „Pizza” szó és az irányítószámuk: 11369!
7. Számold meg, hány „Tony”-val kezdődő névvel rendelkező étterem van az adatbázisban! (40 db a helyes válasz)
   
Játssz tovább az adatbázissal tetszőlegesen! Találj ki további lekérdezéseket!

## 3-as feladathoz
### Gyakorlás a „restaurants” listán

1. Ha még nem tetted meg, telepítsd a „restaurants” listát a 2. feladat leírásában található („Adatbázis importálása .json fájlból”) feladat alapján.   
2. Kérdezd le a Queens kerületben lévő éttermek nevét fordított sorrendben!   
3. Kérdezd le a Brooklynban mexikói konyhával rendelkező éttermek nevét és címét, nevük szerinti sorrendben!   
4. Kérdezd le a Queens-ben lévő olasz konyhával rendelkező éttermek nevét, amelyek bármelyik körúton („Boulevard”) megtalálhatóak.   
5. Hány darab olasz étterem van Manhattan-ben? (510 lesz a helyes válasz.)   
6. Jelenítsd meg a Bronxban található ír éttermek neveit és konyhájának típusát, név szerinti fordított sorrendben!   
7. Kérdezd le a Queens-ben található éttermek neveit és címét, amelyek a Queens Boulevard-on vannak, a házszámban nincs "-" jel, a házszámok szerinti növekvő sorrendben. (String-ként tárolja az adatbázis, de most elég csak string szerinti sorrendben kiíratni a házszámokat.)   
8. Kérdezd le Bronx éttermeit, amelyek NEM olasz vagy kínai konyhával rendelkeznek!   
9. Kérdezd le a legnagyobb irányítószámmal rendelkező étterem nevét, konyháját és címét, amely Queens-ben található!   
10. Kérdezd le az 5. legnagyobb irányítószámmal rendelkező étterem nevét és címét! (11694-et várunk.)   
   
Bónusz feladatok:
1. Kérdezd le és jelenítsd meg a konyhák típusait Manhattanban! (Minden típus egyszer jelenjen meg!) => tipp: distinct használata   
2. Az aggregáció és project segítségével kérdezd le a Bronxban található amerikai konyhával rendelkező éttermek nevét, konyhatípusát, kerületnevét, és egy „countOfGrades” nevű mező adja vissza, hogy hány darab szavazatot kaptak az egyes éttermek:   

![image](https://user-images.githubusercontent.com/31008444/166245674-c19c8478-6c0f-4cdf-88bd-9ac10ea82eef.png)
   
## 4-es feladathoz
### Validátorok létrehozásának gyakorlása

1. Használjuk a videoStore adatbázist!   
2. Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:
  - _id: kötelező megadni és csak egész számokból (integer) állhat   
  - 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat   
  - 'movies' mező: 'array' lehet és kötelező megadni   
  - 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)   

3. Végezzünk el pár próbamentést az alábbi adatokkal! A lényeg, hogy egyik adatnak sem szabad(na) elmentésre kerülnie:
  - _id:NumberInt(1), name: "Cinema!", movies:[], address: {city:"Budapest"}   
  - name: "Cinema", movies:[], address: {city:"Budapest"},   
  - _id:NumberInt(1), name: "Cinema", movies: "Titanic", address: {city:"Budapest"},   
  - _id:NumberInt(1), name:"Cinema", address: {city:"Budapest"},   
  - _id:NumberInt(1), name: "Cinema", movies:[], address: "Budapest",   
  - _id:NumberInt(1), name:"Cinema", movies:[]   

Egyik sem működhet a validátor használata során:

![image](https://user-images.githubusercontent.com/31008444/166246133-ab02e5f8-c0bf-4ce8-86d5-62afe7558857.png)
   
4. Most megfelelő adatokkal mentsünk el 3 mozi dokumentumot:
  - pl.: _id: NumberInt(1), name: "Cinema Mompark", movies:[], address: {city:"Budapest"}...   
  - Adjunk hozzá az egyik dokumentum „movies” listájához egy tetszőleges mozifilm id-t (amely létezik a „movies” collection-ben)!   
5. Ellenőrizzük, hogy amikor update-elni akarjuk a mozi egy-egy sorát, nem engedi a validátorunk:   
  - Próbáljuk átírni a mozi nevét, hogy egy speciális karaktert tartalmazzon! Cinema Mompark => %Cinema MomPark   
  - Frissítsük az egyik dokumentumot úgy, hogy a movies listát próbáljuk lecserélni egy sima filmcímre!   
  - Próbáljuk meg eltávolítani az "address" mezőt!   
  - Próbáljuk eltávolítani a "movies" mezőt!   
Egyik sem működhet a validátor használata során.

