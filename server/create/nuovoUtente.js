import express from "express";
const app = express();
import cors from "cors";
app.use(cors());
import bodyParser from "body-parser";
const { urlencoded, json } = bodyParser;
app.use(urlencoded({ extended: true }));
app.use(json());
import axios from "axios";
import https from "https";
import sslRootCas from "ssl-root-cas";
import bcrypt from "bcrypt"; // Importa bcrypt

https.globalAgent.options.ca = sslRootCas.create();

/**
 * QUESTA CHIAMATA REGISTRA UNA NUOVO UTENTE NEL DB
 */

const url =
  "https://srv04/fmi/data/v2/databases/TAW91/layouts/A4_03_TabRig_Utenti/records";

const nuovoUtente = async (token, req, res) => {
  // Estrai la password dal corpo della richiesta
  const password = req.body.fieldData.M_06_password;

  // Hash la password usando bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Sostituisci la password originale con la versione codificata in base64
  req.body.fieldData.M_06_password = hashedPassword;

  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: req.body,
  };

  try {
    await axios(config);
  } catch (error) {
    if (error.response) {
      console.log("Stato della risposta nuovo:", error.response.status);
      console.log("Dati della risposta nuovo:", error.response.data);
      res.send(error);
    } else if (error.request) {
      console.log("Richiesta inviata ma nessuna risposta ricevuta");
      res.send(error);
    } else {
      console.log("Errore durante la richiesta:", error.message);
      res.send(error);
    }
  }
};
export default nuovoUtente;
