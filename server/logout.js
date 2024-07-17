import fs from "fs";
import moment from "moment";

// Funzione per scrivere nel file di log quando un utente si slogga
const scriviLog = (messaggio) => {
  const oraAttuale = moment().format("DD/MM/YYYY [alle] HH:mm");
  const log = `${oraAttuale}: ${messaggio}\n`;

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Errore durante la scrittura nel file di log:", err);
    }
  });
};
// LOGOUT VOLONTARIO DA PARTE DELL UTENTE NELL HEADER

const logLogoutClick = async (token, req, res) => {
  try {
    const chiavi = Object.keys(req.body);
    const nomeUtente =
      chiavi.length > 0 ? chiavi[0] : "Nome utente non trovato"; // Scrivi nel file di log che l'utente si è sloggato
    if (nomeUtente === "Nome utente non trovato") {
      return;
    }
    scriviLog(
      `Utente ${req.body.nomeUtente} ha effettuato il logout con successo`
    );
    res.send("ok");
    // Altre operazioni di logout...
  } catch (error) {
    console.error("Errore durante il logout:", error);
  }
};
export default logLogoutClick;
