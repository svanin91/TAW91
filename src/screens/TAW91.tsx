import React, { useContext, useEffect } from "react";
import { RiFileList3Fill } from "react-icons/ri";
import { RiCarFill } from "react-icons/ri";
import { RiBuilding4Line } from "react-icons/ri";
import { LoggedContext } from "../context/LoggedContext";
import { FaCircleUser } from "react-icons/fa6";
import Card from "../components/Card";
import axios from "axios";
import resetLoggedContext from "../context/reset/ResetLoggedContext";

const TAW91: React.FC = () => {
  const LoggedMyContext = useContext(LoggedContext);

  // FUNZIONE PER RECUPERARE IL CONTEXT INVIATO DA COM38

  useEffect(() => {
    const fetchData = async () => {
      resetLoggedContext(LoggedMyContext);
      try {
        const response = await axios.get(
          "http://localhost:10200/receive-context"
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_01_nome(
          response.data.LoggedMyContext.A4_03_TabRig_utenti_M_01_nome
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_02_cognome(
          response.data.LoggedMyContext.A4_03_TabRig_utenti_M_02_cognome
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_03_grado(
          response.data.LoggedMyContext.A4_03_TabRig_utenti_M_03_grado
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_04_matricola(
          response.data.LoggedMyContext.A4_03_TabRig_utenti_M_04_matricola
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_05_nome_utente(
          response.data.LoggedMyContext.A4_03_TabRig_utenti_M_05_nome_utente
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_07_attivo(
          response.data.LoggedMyContext.A4_03_TabRig_utenti_M_07_attivo
        );
        LoggedMyContext.setA4_03_TabRig_utenti_M_10_cognome_nome(
          response.data.LoggedMyContext.A4_03_TabRig_utenti_M_10_cognome_nome
        );
        LoggedMyContext.setIsLogged(response.data.LoggedMyContext.isLogged);
        LoggedMyContext.setLogOutClick(
          response.data.LoggedMyContext.logoutClick
        );
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
      }
    };
    fetchData();
  }, []);

  /*useEffect(() => {
    if (LoggedMyContext.isLogged) {
      let timeoutId: number;

      const resetTimer = () => {
        clearTimeout(timeoutId);

        timeoutId = window.setTimeout(async () => {
          // Ricarica la pagina dopo 10 minuti di inattività
          try {
            await axios.post("http://localhost:10200/logLogoutInattivita", {
              nomeUtente: LoggedMyContext.A4_03_TabRig_utenti_M_05_nome_utente,
              loggato: LoggedMyContext.isLogged,
            });
            // Invia la richiesta per chiudere il server Node.js
            await axios.post("http://localhost:10200/shutdown");
          } catch (error) {
            console.error("Errore durante la chiamata axios:", error);
          } finally {
            window.close();
          }
        }, 1 * 3 * 1000); // 10 minuti in millisecondi 10 * 60 * 1000)
      };

      // Aggiungi gli event listener per resettare il timer su interazione dell'utente
      window.addEventListener("mousemove", resetTimer); // Questo evento si verifica quando l'utente sposta il mouse sopra la pagina web
      window.addEventListener("keydown", resetTimer); // Si verifica quando l'utente preme un tasto sulla tastiera
      window.addEventListener("click", resetTimer); // Si verifica quando l'utente fa clic su un elemento della pagina web con il mouse
      window.addEventListener("scroll", resetTimer); // Questo evento si verifica quando l'utente scorre la pagina web

      // Inizializza il timer quando il componente si monta
      resetTimer();

      // Rimuovi gli event listener quando il componente viene smontato
      return () => {
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
        window.removeEventListener("click", resetTimer);
        window.removeEventListener("scroll", resetTimer);
        clearTimeout(timeoutId);
      };
    }
  }, [LoggedMyContext.isLogged]);*/

  return (
    <div
      className="bg-gray-200 w-screen h-screen flex items-center justify-center"
      style={{ userSelect: "none" }}
    >
      <div className="flex justify-center items-center">
        <div className="m-4">
          <Card
            to="/utenti"
            icon={FaCircleUser}
            title="GESTIONE UTENTI"
            description="Consulta l'elenco degli utenti, modifica o creane di nuovi."
          />
        </div>

        <div className="m-4">
          <Card
            to="/glossario"
            icon={RiCarFill}
            title="GESTIONE MEZZI"
            description="Gestisci i mezzi in dotazione al comando"
          />
        </div>
        <div className="m-4">
          <Card
            to="/glossario"
            icon={RiBuilding4Line}
            title="GESTIONE REPARTI"
            description="Gestisci, modifica o crea nuovi reparti"
          />
        </div>
        <div className="m-4">
          <Card
            to="/CDS"
            icon={RiFileList3Fill}
            title="CODICE DELLA STRADA"
            description="Consulta il codice della strada"
          />
        </div>
      </div>
    </div>
  );
};

export default TAW91;
