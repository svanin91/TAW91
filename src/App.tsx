import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TAW91 from "./screens/TAW91.tsx";
import NuovoUtente from "./screens/NuovoUtente.tsx";
import ModificaUtente from "./screens/ModificaUtente.tsx";
import Header from "../src/components/Header.tsx";
import Footer from "../src/components/Footer.tsx";
import Utenti from "./screens/Utenti.tsx";
import Utente from "./screens/Utente.tsx";
import Cds from "./screens/CDS.tsx";
import { LoggedContext } from "./context/LoggedContext.tsx";
import axios from "axios";

const App: React.FC = () => {
  const LoggedMyContext = useContext(LoggedContext);

  //CHIAMATA DI LOGOUT E CHIUSURA SCHEDA PER INATTIVITà

  useEffect(() => {
    let timeoutId: number;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        // Ricarica la pagina dopo 10 minuti di inattività
        axios.post("http://localhost:10200/logLogoutInattivita", {
          nomeUtente: LoggedMyContext.A4_03_TabRig_utenti_M_05_nome_utente,
        });
        //window.location.reload();
        window.close();
      }, 10 * 60 * 1000); // 10 minuti in millisecondi 10 * 60 * 1000)
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (LoggedMyContext.logoutClick) {
        try {
          await axios.post("http://localhost:10200/logLogoutClick", {
            nomeUtente: LoggedMyContext.A4_03_TabRig_utenti_M_05_nome_utente,
          });
          window.location.reload();
        } catch (error) {
          console.error("Errore durante la chiamata AJAX:", error);
        }
      }
      LoggedMyContext.setLogOutClick(false);
    };

    fetchData();
  }, [LoggedMyContext.logoutClick]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/TAW91" Component={TAW91} />
        <Route path="/utenti" Component={Utenti} />
        <Route path="/nuovo-utente" Component={NuovoUtente} />
        <Route path="/modifica-utente/:_id" Component={ModificaUtente} />
        <Route path="/utente/:_id" Component={Utente} />
        <Route path="/cds" Component={Cds} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
