


Arhitektura aplikacije Makao
================

U ovom dokumentu bice predstavljena osnovna struktura aplikacije makao kao i projektni obrasci koji su kori�ceni prilikom projektovanja.

Slojeviti klijent-server
---------------------

Aplikacija ima dvoslojnu klijent-server arhitekturu. Slojevi su:

SLIKA

- **klijentski sloj**
 - korisnicki interfejs
 - obrada dozvoljenih poteza
- **serverski sloj**
 - upravljanje bazom podataka
 - aplikaciona logika

Odlucili smo se za dvoslojnu arhitekturu iz sledecih razloga:

 - Deo obrade poteza mora postojati i na klijentu, kako korisnik ne bi morao da ceka na odgovor sa servera prilikom svakog svog klika. Ovo takode omogucava raspodelu poslova, gde klijent brine o tome da je serveru poslao potez koji je sigurno korektan a server brine o odigravanju poteza. Obrada poteza je detaljno obja�njena u ....
 - Serverski sloj upravlja bazama podataka. Ovo se mo�da mo�e klasifikovati kao podsloj, jer je logika za samu komunikaciju sa bazom potuno odvojena. Upravljanje redisom je moguce samo kroz njegov API a mongodb se koristi upravljanjem njegovih modela. Iako aplikaciona logika i upravljanje bazom podataka nisu striktno izdvojeni, predstavljaju dve posebne logicke celine.

FLUX
----------

Flux je arhitektura koju Facebook koristi za kreiranje klijentskih strana web aplikacija i koja se lepo uparuje sa Reactom. Su�tina ovog obrasca je jednosmerni tok podataka. 

Cetiri osnovna elementa Flux aplikacija su: akcije, dispecer, skladi�te i pogled.

![Flux general architecture](images/flux-general.png)

**Dispecer** je na neki nacin centralna tacka koja upravlja tokom podataka u Flux arhitekturi. On predstavlja "glupu" komponentu koja je u su�tini registar *callback* funkcija skladi�ta i pru�a jednostavni mehanizam za distribuiranje akcija ka skladi�tima.

Dispecer raspola�e metodom koja nam omogucava da po�aljemo obave�tenje i propratne podatke, �to ukratko nazivamo izazivanjem ili slanjem **akcije**.

**Skladi�te** cuva stanje aplikacije. Ne postoji samo jedno skladi�te vec vi�e njih, i svako cuva stanje vezano za odredeni domen u okviru aplikacije.

![Flux React architecture](images/flux-react.png)

Ova arhitektura podseca na me�avinu implicintnog pozivanja i obrasca skladi�te jer je osnovna ideja da komponente oslu�kuju jedinstveni izvor podataka i reaguju na njegove promene.
Akcije su najce�ce akcije korisnika sa pogledom (komponentom) koje se prosleduju dispeceru. Skladi�te reaguje na poziv, vr�i obradu i menja svoje stanje. Nakon zavr�etka izmene stanja, skladi�te �alje poruku da je do�lo do promene njegovog stanja komponentama koje oslu�kuju to skladi�te.

U slucaju komunikacije sa serverom preko poruka kori�cenjem soketa, odnos sa serverom je implementiran u komponentama koje omotavaju odredeni deo aplikacije i vr�e razmenu poruka vezanih za taj deo. Konkretni primeri ovih komponenti navedeni su u delu *publish-subscribe*.

![Flux sockets](images/flux-sockets.png)

U slucaju prijavljivanja i registrovanja, komunikacija sa serverom ne ide preko sistema poruka vec preko HTTP protokola. U tom slucaju akcije vr�e komunikaciju sa serverom i prosleduju rezultat skladi�tu.

Vi�e o konkretnim skladi�tima....

Publish-subscribe
-----------------------

Razmena poruka u realnom vremenu izmedu klijenata i servera se odvija po publish-subscribe obrascu. Svaku razmenu poruka zapocinje klijent koji se konektuje i tra�i autentikaciju na osnovu svog tokena (*JWT - JSON Web Tokens*). Server proverava identitet korisnika i odobrava mu ili zabranjuje dalju komunikaciju. Ovaj obrazac je implementiran u nekoliko komponenti: 

- *AppSocketWrapper* - ova komponenta je prisutna na svim stranicama aplikacije kojima prijavljeni korisnik ima pristup. Ova komponenta komunicira sa serverom kako bi omogucila korisniku da �alje i prima zahteve za prijateljstvo kao i da prima pozive za uce�ce u igri.
- *PlaySocketWrapper* - komponenta koja vr�i komunikaciju sa serverom u slucaju kreiranja nove igre ili ukljucivanja u postojecu igru iz liste javnih igara.
- *LobbySocketWrapper* - komponenta koja je zadu�ena za inicijalizaciju igre, mesto gde se skupljaju igraci pre nego �to sama igra pocne. Komunicira sa serverom kako bi ispitala stanje igre i odlucila da li je korisniku dozvoljen pristup lobiju odredene igre. Omogucava pracenje stanja svih igraca koji su prisutni u lobiju, odnosno da li su spremni za pocetak igre ili ne. Takode omogucava pozivanje prijatelja u igru.
- *GameSocketWrapper* - komponenta koja je zadu�ena za komunikaciju sa serverom u vezi sa tokom same igre. Sve pribavljene podatke prosleduje komponenti koja prikazuje samu igru.
- *ChatSocketWrapper* - komponenta koja omogucuje caskanje u toku same igre.

Detaljnije o komunikaciji ovih komponenti sa serverom na....

