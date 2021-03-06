Model perzistencije i podataka
==========================

U ovom dokumentu biće opisani modeli podataka koji se čuvaju u aplikaciji Makao.
Modeli podataka na frontednu pripadaju jednoj od sledece tri grupe:
 - podaci koji su dobijeni sistemom za razmenu poruka o kojima možete procitati više u [message-passing](message-passing.md)
 - podaci koji se čuvaju u skladištima
 - podaci koje same komponente koriste za prikaz i koji se nalaze u stanju te komponente ili su opisani na njenom kraju preko `propTypes` ukoliko te podatke dobijaju od neke komponente koja se nalazi na višoj poziciji u hijerarhiji

Šema baze podataka
--------------------------
####MongoDB
Kao maper za MongoDB korišćen je Mongoose. 
Šema za korisnika
```    
{
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    friends: [String],
    friendRequests: [String],
    games: [mongoose.Schema.Types.ObjectId],
    stats: mongoose.Schema.Types.ObjectId
}
```
Šema za partiju
```
{
    rules: [{}],
    date: Date,
    duration: Number,
    players: [String],
    kicked: [String],
    handNum: Number,
    scores: [{}]
}
```
Šema za statistiku korisnika
```
{
    username: String,
    scores: [Number],
    totalScore: Number,
    timeSpent: [Number],
    totalTimeSpent: Number,
    averageTimeSpent: Number,
    gamesPlayed: Number,
    gamesLeft: Number,
    gamesWon: Number
}
```

####Redis

Za pristup bazi korišćen je redis klijent za node.js koji implementira sve Redis komande.

| Key							| Value type | Value |
| :------- 						| :----: | ---: |
| `socket:username` | string|  socketId (string) koji odgovara tom korisniku   |
| `game:chat`| lista | poruke jedne partije |
| `game:username`| string   |  objekat koji sadrži sve podatke o samoj igri  |
| `game:username:socket` | hash| key je username a value njegov socketId |
| `game:username:lobby` | hash | key je username a value njegov status (ready)|
| `game:username:invites` | skup | skup korisnika koji su pozvani u igru|
| `games:lobby` | skup | skup igara koje su keirane a nisu zapocete|
| `games:started` | skup | skup zapocetih igara|

> **Napomena:** username nije ključna reč već predstavlja username korisnika. U ključevima oblika `game:` username označava username kreatora igre. On je u stvari sam ključ te igre jer jedan korisnik može imati (kreirati i igrati) samo jednu igru u jednom trenutku.

Odlučili smo se da samu partiju čuvamo kao string, odnosno da jedan objekat čuva sve potrebne informacije jer je prilikom odigravanja poteza igrača potreban uvid u većinu polja tog objekta (lista karata igraca, lista karata na talonu, lista karata za izvlačenje, lista igrača, njihov status i broj karata...). Pa kako je redis key-value baza podataka odabrali smo da korisnik jednim upitom dobije pristup celom objektu, kako bi smanjili broj poziva baze i vreme potrebno za pribavljanje a kasnije i čuvanje tih podataka.

Redis ne brine (i ne interesuje ga) sadržaj odnosno sturktura samih podataka koje čuva, što izmenu cini jako jednostavnom. 

Šema objekta same igre
--------------------------

```
{
	status: string ('lobby' | 'started' | 'finished'),
	start: Date,
	end: Date,
	duration: Number, //real number, duration in minutes
	playerOnMove: string, //username
	handStarter: string, //username
	direction: Number (1 | -1),
	players: {
		username: {
                     online: boolean,
                     cards: [object(Card)]
                     timeUp: Number, //koliko puta nije odigrao potez na vreme
                     kicked: boolean, 
                  },
		username2: {}...
		},
	drawStack: [object(Card)],
	openStack: [object(Card)],
	sevens: Number, //broj uzastopnih sedmica na talonu pre nego što je neko kupio karte
	rules: object,
	logs[]: {
				username: string,
				message: string,
				draw: Number,
				card: object(Card),
				jackSymbol: string,
				win: boolean,
			}
	scores[]: [{username: string, score: number}, ...] //niz rundi gde svaka runda ima niz igraca
}
```
> **Napomena:** određeni atributi nisu obavezni ili ne postoje tokom celog "životnog veka" objekta. ```end``` se upise po završetku igre, ```players[username].kicked``` se inicijalizuje nakon što je igraš izbačen iz igre. Objekti koji se nalaze u nizu logs obično sadrže samo neke od atributa koji govore o tipu loga: odigravanje poteza, menjanje znaka, pobeda i slično. 
