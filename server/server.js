import express from "express";
import cors from "cors";
import axios from "axios";
import bodyParser from "body-parser";
import listaUtenti from "./read/listaUtenti.js";
import nuovoUtente from "./create/nuovoUtente.js";
import modificaUtente from "./update/modificaUtente.js";
import findUtente from "./read/findUtente.js";
import codiceStradale from "./read/codiceStradale.js";
import logLogoutInattivita from "./logoutInattivita.js";
import multer from "multer";
import logLogoutClick from "./logout.js";
import invia_screenshot_email from "./screenShotEmail.js";

const app = express();

//Serve tutti i file statici dalla directory corrente
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.json({ limit: "200mb" }));
app.use(express.json({ limit: "200mb" }));
app.use(express.static("/src"));
var data = JSON.stringify({});
//app.use(cors({ origin: "http://localhost:5173" }));

// Configurazione per consentire payload fino a 10 MB (puoi regolare questo valore secondo le tue esigenze)
app.use(bodyParser.json({ limit: "80mb" }));
app.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));
const upload = multer({ limits: { fieldSize: 100 * 2024 * 2024 } }); // Limite di 25MB per il payload

//import https from "https";
//import sslRootCas from "ssl-root-cas";
//https.globalAgent.options.ca = sslRootCas.create();
//eslint-disable-next-line no-undef
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// Imposta la porta del server
var token_TAW91 = "no token";
const url_TAW91 = `https://srv04/fmi/data/v2/databases/TAW91/sessions`;
const UtenteAPI = "svanin:svanin";

const Codifica = btoa(UtenteAPI);

var config = {
  method: "post",
  maxBodyLength: Infinity,
  url: url_TAW91,
  headers: {
    Authorization: `Basic ${Codifica} `,
    "Content-Type": "application/json",
  },
  data: data,
};
async function connessioneTAW91() {
  try {
    const response = await axios(config);
    token_TAW91 = response.data.response.token;
    console.log("token TAW91 connesso", token_TAW91);
  } catch (error) {
    console.log(error.message);
  }
}
/**
 * QUESTA è LA FUNZIONE ASYNCORNA CHE PERMETTE LA CONNESSIONE PRIMA DI QUALSIASI ALTRA OPERAZIONE
 */

const server = app.listen(10200, () => {
  console.log("Siamo connessi alla porta 10200");
});

// Esecuzione asincrona immediata
(async () => {
  // Avvio del server Express
  server;
  // Esecuzione della funzione per la connessione TAW91
  await connessioneTAW91();
})();

app.get("/listaUtenti", async (req, res) => {
  await listaUtenti(token_TAW91, req, res);
  connessioneTAW91();
});

// QUESTA è LA CHIAMATA PER CREARE UN NUOVO RECORD IN TABELLA UTENTI

app.post("/nuovo-utente", async (req, res) => {
  (async () => {
    await nuovoUtente(token_TAW91, req, res);
    connessioneTAW91(26);
  })();
});

// QUESTA CHIAMATA MODIFICA L'UTENTE

app.patch("/modifica-utente", async (req, res) => {
  (async () => {
    await modificaUtente(token_TAW91, req, res);
    connessioneTAW91(58);
  })();
});

// QUESTA CHIAMATA PERMETTE LA RICERCA NEL DB DELL' INPUT CERCATO

app.post("/findUtente", async (req, res) => {
  (async () => {
    await findUtente(token_TAW91, req, res);
    connessioneTAW91(24);
  })();
});

// CHIAMATA PER IL CODICE DELLA STRADA

app.get("/codiceStradale", async (req, res) => {
  await codiceStradale(token_TAW91, req, res);
  connessioneTAW91();
});

// LOGOUT PER INATTIVITA

app.post("/logLogoutInattivita", async (req, res) => {
  (async () => {
    await logLogoutInattivita(req, res);
    connessioneTAW91();
  })();
});

let utente = {};
// Endpoint per ricevere i dati
app.post("/receive-context", (req, res) => {
  utente = req.body; // Memorizza i dati ricevuti nella variabile `utente`
  console.log("Dati ricevuti:", utente);
  res.json({ message: "Dati ricevuti con successo" });
});

// Endpoint per inviare i dati al frontend
app.get("/receive-context", (req, res) => {
  res.json(utente); // Invia i dati memorizzati al frontend
});

// Endpoint per terminare il server e chiudere correttamente i processi
app.post("/shutdown", (req, res) => {
  res.send("Server shutting down...");
  console.log("Server shutting down...");

  // Chiusura del server e gestione dell'uscita
  server.close((err) => {
    if (err) {
      console.error("Errore durante la chiusura del server:", err);
      process.exit(1); // Esci con codice di errore
    }
    console.log("Server chiuso correttamente.");
    process.exit(0); // Esci con successo
  });
});

// INVIO EMAIL SCREENSHOT PER ASSISTENZA

app.post(
  "/invia-screenshot-email",
  upload.single("screenshot"),
  async (req, res) => {
    await invia_screenshot_email(req, res);
    connessioneTAW91();
  }
);

/**
 *  QUESTA è LA CHIAMATA PER SCRIVERE NEL FILE DI LOG L'AVVENUTO LOGOUT
 */

app.post("/logLogoutClick", async (req, res) => {
  (async () => {
    await logLogoutClick(token_TAW91, req, res);
    connessioneTAW91(3);
  })();
});
