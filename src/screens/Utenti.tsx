import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TableUtenti from "../components/TableUtenti";
import { BeatLoader } from "react-spinners";
import NuovoPopUp from "../components/PopUp/NuovoPopUp";
import { css } from "@emotion/react";

const Utenti: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [apiData, setApiData] = useState<any[]>([]);
  const [inputFind, setInputFind] = useState("");
  const [ricercaEffettuata, setRicercaEffettuata] = useState(false);

  const [mostraPopUp, setMostraPopUp] = useState(false);
  const [messaggioPopUp, setMessaggioPopUp] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const override = css`
  display: block,
  margin: 0 auto
`;

  const [loading, setLoading] = useState<boolean>(true); // Stato per il caricamento
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:10200/listaUtenti");
      const userData = response.data.data;
      setApiData(userData);
    } catch (error) {
      console.error("Error fetching apiData:", error);
    } finally {
      setLoading(false); // Nascondi lo skeleton loader dopo il caricamento dei dati
    }
  };

  const body = {
    query: [
      { M_01_nome: inputFind },
      { M_02_cognome: inputFind },
      { M_03_grado: inputFind },
      { M_04_matricola: inputFind },
      { M_05_nome_utente: inputFind },
      { M_14_email: inputFind },
      { M_15_telefono_uno: inputFind },
      { M_16_telefono_due: inputFind },
    ],
  };

  // CHIAMATA PER CERCARE UN UTENTE PER I PARAMETRI QUI SOPRA

  const onSubmitFind = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (inputFind === "") {
      fetchData();
      setRicercaEffettuata(false);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:10200/findUtente",
          body
        );
        setApiData(response.data);
        setRicercaEffettuata(true);
      } catch (error) {
        console.log("Nessun risultato dalla ricerca", error);
        setApiData([]);
        setRicercaEffettuata(true);
      }
    }
    setLoading(false);
  };

  const annullaRicerca = () => {
    setInputFind("");
    setRicercaEffettuata(false);
    fetchData();
  };

  /*
  const handleIndietro = () => {
    navigate("/");
  };
  */

  const handleChange = (e: any) => {
    setInputFind(e.target.value.trim());
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmitFind(e);
    }
  };
  const NuovoRecord = async () => {
    handleNuovoPopUp("Vuoi aggiungere un nuovo controllo ?");
  };
  const handleNuovoPopUp = (testo: string) => {
    setMessaggioPopUp(testo);
    setMostraPopUp(true);
  };
  const closeNuovoPopUp = () => {
    setMostraPopUp(false);
  };

  return (
    <div
      className="bg-gray-200 w-screen h-screen px-8 py-20  flex flex-col justify-between	"
      style={{ userSelect: "none" }}
    >
      <div className="h-fit grid grid-cols-2">
        <div className="flex ">
          <form className="relative flex items-center">
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-[38rem] p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-gray-300"
                placeholder="Cerca uno o più utenti"
                onChange={handleChange}
                value={inputFind}
                ref={inputRef}
                onKeyPress={handleKeyPress}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              />
              <div className="absolute end-2.5 bottom-1 space-x-2">
                <button
                  type="submit"
                  onClick={onSubmitFind}
                  className="  bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo font-medium rounded-lg text-sm px-4 py-2"
                >
                  Cerca
                </button>
                {ricercaEffettuata && inputFind ? (
                  <button
                    type="submit"
                    onClick={annullaRicerca}
                    className=" bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Annulla
                  </button>
                ) : null}
              </div>
            </div>
          </form>

          {isHovering ? (
            <div className={`bg-white absolute p-8 z-50 mt-14`}>
              <div>
                <p className="text-2xl mb-3">Qui puoi cercare un utente per:</p>
                <ul className="text">
                  <li>- Cognome</li>
                  <li>- Nome</li>
                  <li>- Nome utente</li>
                  <li>- Matricola</li>
                  <li>- Grado</li>
                  <li>- Indirizzo email</li>
                  <li>- Numero di telefono</li>
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={async () => {
              await NuovoRecord();
            }}
            disabled={loading}
            className="w-auto ml-2 focus:outline-none  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-1 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo"
          >
            AGGIUNGI NUOVO
          </button>
          <button
            onClick={() => {
              navigate(`/TAW91`); // Esplicitamente tipizza come NavigateOptions
            }}
            className="w-auto ml-2 focus:outline-none  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-1 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo"
          >
            INDIETRO
          </button>
        </div>
      </div>
      {loading ? (
        <div className="spinner flex justify-center items-center	w-full h-full">
          <BeatLoader
            color={"rgb(223, 166, 0)"}
            loading={loading}
            cssOverride={override}
            size={30}
          />
        </div>
      ) : (
        <div className="h-full w-full">
          <TableUtenti data={apiData} setData={setApiData} />
        </div>
      )}

      {mostraPopUp && (
        <NuovoPopUp
          title={"Aggiungi nuovo"}
          message={messaggioPopUp}
          onClose={closeNuovoPopUp}
        />
      )}
    </div>
  );
};

export default Utenti;
