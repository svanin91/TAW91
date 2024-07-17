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
https.globalAgent.options.ca = sslRootCas.create();
const url =
  "https://srv04/fmi/data/v2/databases/TAW91/layouts/A4_03_TabRig_Utenti/_find";

/**
 *  QUESTA é UNA CHIAMATA _FIND DI RICERCA UN UTENTE PER DIVERSI CAMPI
 */

const findUtente = async (token, req, res) => {
  let config = {
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
    const response = await axios(config);
    res.send(response.data.response.data);
  } catch (error) {
    console.log("errore", error.message);
    res.status(500).send({ error: "Errore durante la richiesta" });
  }
};
export default findUtente;
