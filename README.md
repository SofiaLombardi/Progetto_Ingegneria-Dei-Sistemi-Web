# BookClub Web App

**Studente:** Sofia Lombardi  
**Corso:** Ingegneria dei Sistemi Web – AA 2024/25

---

## 1.  Introduzione

### Contesto  
BookClub è un’applicazione web pensata per chi ama leggere e vuole gestire la propria libreria personale, annotare i libri letti, quelli da leggere, le recensioni e i voti, e tenere traccia delle proprie statistiche di lettura.

### Scopo  
Offrire agli utenti un’interfaccia semplice e intuitiva per:

- Registrarsi e autenticarsi in modo sicuro
- Aggiungere, modificare e cancellare libri dalla propria libreria
- Gestire una wishlist di libri da leggere
- Assegnare voti e recensioni ai libri letti
- Visualizzare statistiche di lettura personalizzate

---

## 2.  Mock-up

I mock-up delle principali pagine dell’applicazione sono stati realizzati con **Figma**.

**Esempi di schermate:**

- Login/Registrazione  
- Dashboard (libreria personale)  
- Wishlist
- Raccolte  
- Statistiche  
- Profilo utente  



---

## 3.  Tecnologie usate

### Frontend
- **Linguaggio:** JavaScript (ES6+)
- **Framework:** Vue.js 3
- **Librerie:** Bootstrap 5 (UI responsive), Axios (HTTP client)


### Backend
- **Linguaggio:** JavaScript (Node.js)
- **Framework:** Express.js
- **Database:** MongoDB (tramite Mongoose ODM)
- **Autenticazione:** JWT (JSON Web Token)
- **Sicurezza:** Hashing password con bcrypt, middleware di autenticazione per le route protette


### Altre tecnologie
- **Gestione ambienti:** dotenv
- **Controllo versione:** Git

---

## 4. Requisiti base fondamentali

- Registrazione e login sicuri con validazione lato server e client  
- CRUD completo sui libri (aggiunta, modifica, cancellazione, visualizzazione)  
- Gestione wishlist separata dai libri letti  
- Possibilità di assegnare voto (con stelle) e recensione solo ai libri letti  
- Statistiche aggregate (libri letti, media voto, categorie più lette)  
- Interfaccia responsive e accessibile  
- Protezione delle route tramite autenticazione JWT  
- Validazione dati lato backend (Mongoose)  
- Gestione errori coerente e feedback all’utente  

---

## 5.  Struttura del progetto
```
bookclub-app/
├── client/ # Frontend Vue.js
│   ├── public/ # File statici (favicon, index.html, ecc.)
│   └── src/
│       ├── assets/ # Immagini, icone, file statici
│       ├── components/ # Componenti riutilizzabili (BookCard.vue, BookForm.vue, Navbar.vue, ecc.)
│       ├── views/ # Pagine principali (Dashboard.vue, Wishlist.vue, Stats.vue, Profile.vue, ecc.)
│       ├── router/ # Configurazione Vue Router
│       ├── App.vue # Componente root
│       └── main.js # Entry point Vue
│
├── server/ # Backend Node.js/Express
│   ├── controllers/ # Logica delle API
│   ├── middleware/ # Middleware personalizzati
│   ├── models/ # Modelli Mongoose
│   ├── routes/ # Definizione API REST
│   ├── .env # Variabili ambiente
│   └── server.js # Entry point server
│
├── README.md # Documentazione
├── package.json # Script e dipendenze root
└── .gitignore # File ignorati da Git
```

---

## 6.  Installazione e avvio

### Backend (`server/`)
```bash
cd server
npm install
npm start
```
```

### Frontend (`client/`)
```bash
cd client
npm install
npm run dev
```

---
- express
- mongoose
- cors
- dotenv
- bcrypt
- jsonwebtoken
### Frontend (client/)
- vue
- axios
- bootstrap

## 7. Statistiche e grafici

**Backend (server/):**
- express
- mongoose
- cors
- dotenv
- bcrypt
- jsonwebtoken

**Frontend (client/):**
- vue
- axios
- bootstrap

## 8. API principali

### Autenticazione
- `POST /api/auth/register` – Registrazione utente  
- `POST /api/auth/login` – Login utente  
- `GET /api/auth/me` – Dati utente autenticato (protetta)  
- `PUT /api/auth/change-password` – Cambio password (protetta)

### Libri
- `GET /api/books` – Elenco libri utente (protetta)  
- `POST /api/books` – Aggiungi libro (protetta)  
- `PUT /api/books/:id` – Modifica libro (protetta)  
- `DELETE /api/books/:id` – Cancella libro (protetta)  


## 9.  Statistiche e grafici

Nella sezione **Statistiche (Stats.vue)** l’utente può visualizzare:

- Libri per categoria (grafico a torta)  
- Libri da leggere per categoria (grafico a barre)  
- Libri letti per categoria (grafico a barre)  
- Totale libri, media voto, categoria più letta  

## 10.  Link al repository

GitHub Repository:  
[https://github.com/SofiaLombardi/Progetto_Ingegneria-Dei-Sistemi-Web.git](https://github.com/SofiaLombardi/Progetto_Ingegneria-Dei-Sistemi-Web.git)

## 11. Conclusioni
BookClub App offre una soluzione moderna e sicura per la gestione della propria libreria personale, con un’interfaccia intuitiva e funzionalità avanzate di statistica e personalizzazione.

## 12. Screenshot
*(Inserire qui gli screenshot reali delle principali schermate dell’app funzionante, oppure i mock-up se il progetto non è completato.)*
