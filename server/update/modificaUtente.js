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
 * QUESTA CHIAMATA MODIFICA I DATI DI UN UTENTE
 */

const modificaUtente = async (token, req, res) => {
  const password = req.body.dataA4_03_TabRig_Utenti.fieldData.M_06_password;

  // Hash la password usando bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Sostituisci la password originale con la versione codificata in base64
  req.body.dataA4_03_TabRig_Utenti.fieldData.M_06_password = hashedPassword;
  const url = `https://srv04/fmi/data/v2/databases/TAW91/layouts/A4_03_TabRig_Utenti/records/${req.body.id_record}`;
  let config = {
    method: "PATCH",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: req.body.dataA4_03_TabRig_Utenti,
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
};
export default modificaUtente;
