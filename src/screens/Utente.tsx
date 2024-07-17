import { useState } from "react";
import { useNavigate, NavigateOptions, useLocation } from "react-router-dom";
import ModificaPopUp from "../components/PopUp/ModificaPopUp";

const Utente: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const datiUtente = location.state.datiUtente;
  const [mostraPopUp, setMostraPopUp] = useState(false);
  const [messaggioPopUp, setMessaggioPopUp] = useState("");

  const Modifica = () => {
    handleModificaPopUp(
      `Vuoi modificare l'utente ${datiUtente.M_05_nome_utente} ?`
    );
  };
  const Indietro = () => {
    navigate("/utenti");
  };

  const handleModificaPopUp = (testo: string) => {
    setMessaggioPopUp(testo);
    setMostraPopUp(true);
  };
  const closeModificaPopUp = () => {
    setMostraPopUp(false);
  };

  return (
    <div
      className="bg-gray-200 w-screen h-screen px-8 py-20  flex flex-col justify-between	"
      style={{ userSelect: "none" }}
    >
      <div className="h-fit flex justify-between items-center ">
        <p className="text-2xl ...">
          DETTAGLI UTENTE : {datiUtente.M_05_nome_utente}
        </p>
        <div>
          <button
            onClick={async () => {
              await Modifica();
            }}
            className="w-auto ml-2 focus:outline-none  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-1 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo"
          >
            MODIFICA
          </button>
          <button
            onClick={async () => {
              await Indietro();
            }}
            className="w-auto ml-2 focus:outline-none  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-1 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo"
          >
            INDIETRO
          </button>
        </div>
      </div>
      <div className="h-full pt-20" style={{ height: "calc(100% - 4rem)" }}>
        <ul className="space-y-4">
          <li>Cognome : {datiUtente.M_02_cognome}</li>
          <li>Nome : {datiUtente.M_01_nome}</li>
          <li>Matricola : {datiUtente.M_04_matricola}</li>
          <li>Grado : {datiUtente.M_03_grado}</li>
          <li>Reparto : {datiUtente.M_10_reparto}</li>
          <li>Nome utente : {datiUtente.M_05_nome_utente}</li>
          <li>Telefono uno : {datiUtente.M_15_telefono_uno}</li>
          <li>Telefono due : {datiUtente.M_16_telefono_due}</li>
          <li>S/N chiave : {datiUtente.M_12_sn_chiave}</li>
          <li className="flex items-center">
            SMS Book :{" "}
            {datiUtente.M_13_SMSBook ? (
              <img
                className="h-8"
                src="../../public/static/approval.png"
                alt="Approved"
              />
            ) : (
              <img
                className="h-8"
                src="../../public/static/disapprove.png"
                alt="Approved"
              />
            )}
          </li>
          <li className="flex items-center">
            Attivo :{" "}
            {datiUtente.M_07_attivo ? (
              <img
                className="h-8"
                src="../../public/static/approval.png"
                alt="Approved"
              />
            ) : (
              <img
                className="h-8"
                src="../../public/static/disapprove.png"
                alt="Approved"
              />
            )}
          </li>
          <li>Indirizzo : {datiUtente.M_11_indirizzo}</li>
          <li>Indirrizzo Email : {datiUtente.M_14_email}</li>
        </ul>
      </div>
      {mostraPopUp && (
        <ModificaPopUp
          title={"Modifica utente"}
          message={messaggioPopUp}
          onClose={closeModificaPopUp}
          datiUtente={datiUtente}
        />
      )}
    </div>
  );
};
export default Utente;
