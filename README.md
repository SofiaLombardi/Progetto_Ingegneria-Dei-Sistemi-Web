# BookClub Web App

**Studente:** Sofia Lombardi  
**Corso:** Ingegneria dei Sistemi Web – AA 2024/25

---

## 1. Introduzione

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
- Statistiche  
- Profilo utente  

*📸 Inserire qui le immagini esportate da Figma*

---

## 3.  Tecnologie usate

### Frontend
- **Linguaggio:** JavaScript (ES6+)
- **Framework:** Vue.js 3
- **Librerie:** Bootstrap 5 (UI responsive), Axios (HTTP client)
- **Gestione stato:** Variabili reattive locali

### Backend
- **Linguaggio:** JavaScript (Node.js)
- **Framework:** Express.js
- **Database:** MongoDB (tramite Mongoose ODM)
- **Autenticazione:** JWT (JSON Web Token)
- **Sicurezza:** Hashing password con bcrypt, middleware di autenticazione per le route protette
- **CORS:** Gestito tramite il pacchetto `cors`

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

## 5.  Installazione e avvio

### Backend (`server/`)
```bash
cd server
npm install
npm start
```
### Frontend (client/)
```bash
cd client
npm install
npm run dev
```
## 6. Pacchetti installati
### Backend (server/)
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

## 7. API principali
### Autenticazione
POST /api/auth/register – Registrazione utente

POST /api/auth/login – Login utente

GET /api/auth/me – Dati utente autenticato (protetta)

PUT /api/auth/change-password – Cambio password (protetta)

### Libri
GET /api/books – Elenco libri utente (protetta)

POST /api/books – Aggiungi libro (protetta)

PUT /api/books/:id – Modifica libro (protetta)

DELETE /api/books/:id – Cancella libro (protetta)

## 8. Statistiche e grafici
Nella sezione Statistiche (Stats.vue) trovi:

  - Libri per categoria (grafico a torta)
  - Libri da leggere per categoria (grafico a barre)
  - Libri letti per categoria (grafico a barre)
  - Totale libri, media voto, categoria più letta

## 9. Link al repository
https://github.com/SofiaLombardi/Progetto_Ingegneria-Dei-Sistemi-Web.git

## 10. Conclusioni
BookClub App offre una soluzione moderna e sicura per la gestione della propria libreria personale, con un’interfaccia intuitiva e funzionalità avanzate di statistica e personalizzazione.

## 11. Screenshot
(Inserisci qui screenshot delle principali schermate dell’app)
