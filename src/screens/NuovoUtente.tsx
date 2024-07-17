import { useContext, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EsitoPopUp from "../components/PopUp/EsitoPopUp";
import { UtenteContext } from "../context/UtenteContext";
import InputIndirizzo from "../components/InputIndirizzo";
import ErrorPopup from "../components/PopUp/ErrorPopup";
import resetUtenteContext from "../context/reset/ResetUtenteContext";

const NuovoUtente: React.FC = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpass, setConfirmpass] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPopUpEsito, setShowPopUpEsito] = useState(false);
  const [showError, setShowError] = useState(false);
  const [messaggioPopUp, setMessaggioPopUp] = useState("");
  const [valueCognome, setValueCognome] = useState("");
  const [valueNome, setValueNome] = useState("");
  const [valueGrado, setValueGrado] = useState("");
  const [valueMatricola, setValueMatricola] = useState("");
  const [valueTelefono_1, setValueTelefono_1] = useState("");
  const [valueTelefono_2, setValueTelefono_2] = useState("");
  const [valueReparto, setValueReparto] = useState("");
  const [valueSNChiave, setValueSNChiave] = useState("");
  const [valueSMSBook, setValueSMSBook] = useState(0);
  const [valueAttivo, setValueAttivo] = useState(1);
  const [valueNomeUtente, setValueNomeUtente] = useState("");
  const [valueEmail, setValueEmail] = useState("");

  const UtenteMyContext = useContext(UtenteContext);

  const closeEsitoPopUp = () => {
    setShowPopUpEsito(false);
    navigate("/utenti");
  };

  const handleChangeCognome = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_02_cognome(
      e.target.value.toUpperCase()
    );
    setValueCognome(e.target.value.toUpperCase());
  };

  const handleChangeNome = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_01_nome(
      e.target.value.toLowerCase()
    );
    setValueNome(e.target.value.toLowerCase());
  };

  const handleChangeMatricola = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_04_matricola(e.target.value);
    setValueMatricola(e.target.value);
  };

  const handleChangeTelefono_1 = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_15_telefono_uno(
      formatPhoneNumber(e.target.value)
    );
    setValueTelefono_1(formatPhoneNumber(e.target.value));
  };

  const handleChangeTelefono_2 = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_16_telefono_due(
      formatPhoneNumber(e.target.value)
    );
    setValueTelefono_2(formatPhoneNumber(e.target.value));
  };

  const handleChangeSNChiave = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_12_sn_chiave(e.target.value);
    setValueSNChiave(e.target.value);
  };

  const handleChangeReparto = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_10_reparto(e.target.value);
    setValueReparto(e.target.event);
  };
  const handleChangeGrado = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_03_grado(e.target.value);
    setValueGrado(e.target.value);
  };

  const handleChangeSMSBook = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_13_SMSBook(
      e.target.checked ? 1 : 0
    );
    setValueSMSBook(e.target.checked ? 1 : 0);
  };
  const handleChangeAttivo = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_07_attivo(
      e.target.checked ? 1 : 0
    );
    setValueAttivo(e.target.checked ? 1 : 0);
  };
  const handleChangeNuovoUtente = (e: any) => {
    UtenteMyContext.setA4_03_TabRig_Utenti_M_05_nome_utente(e.target.value);
    setValueNomeUtente(e.target.event);
  };
  const formatPhoneNumber = (value: string) => {
    // Rimuove tutti i caratteri non numerici
    const cleaned = value.replace(/\D/g, "").slice(0, 10); // Limita a 10 cifre
    const match = cleaned.match(/^(\d{0,3})(\d{0,7})$/);

    if (match) {
      return match[1] + (match[2] ? "-" + match[2] : "");
    }

    return value;
  };

  //FUNZIONE PER CONTROLLO EMAIL
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValueEmail(value);

    if (
      !value.includes("@") ||
      (!value.includes(".it") && !value.includes(".com"))
    ) {
      setEmailError("Attenzione! Email non valida.");
    } else {
      setEmailError("");
      UtenteMyContext.setA4_03_TabRig_Utenti_M_14_email(value);
    }
  };
  //FUNZIONE PER CONTROLLO PASSWORD
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    //setValuePassword(value);
    /*
   if (value !== confirmpass) {
      setPasswordError("Le password non corrispondono.");
    } else {
      setPasswordError("");
    }*/
  };
  //FUNZIONE PER CONTROLLO CONFERMA PASSWORD
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setConfirmpass(value);
    if (value !== password) {
      setPasswordError("Le password non corrispondono.");
    } else {
      setPasswordError("");
      UtenteMyContext.setA4_03_TabRig_Utenti_M_06_password(value);
    }
  };
  //FUNZIONE PER BOTTONE INDIETRO
  const handleIndietro = () => {
    resetUtenteContext(UtenteMyContext);
    navigate("/utenti");
  };

  // questa funzione gestisce i pop up per eventuali dati errati

  const handleError = (testo: string) => {
    setMessaggioPopUp(testo);
    setShowError(true);
  };

  const closeErrorPopup = () => {
    setShowError(false);
  };

  //DATI PER FILEMAKER
  const A4_03_TabRig_Utenti = {
    fieldData: {
      M_01_nome: UtenteMyContext.A4_03_TabRig_Utenti_M_01_nome,
      M_02_cognome: UtenteMyContext.A4_03_TabRig_Utenti_M_02_cognome,
      M_03_grado: UtenteMyContext.A4_03_TabRig_Utenti_M_03_grado,
      M_04_matricola: UtenteMyContext.A4_03_TabRig_Utenti_M_04_matricola,
      M_05_nome_utente: UtenteMyContext.A4_03_TabRig_Utenti_M_05_nome_utente,
      M_06_password: UtenteMyContext.A4_03_TabRig_Utenti_M_06_password,
      M_07_attivo: UtenteMyContext.A4_03_TabRig_Utenti_M_07_attivo,
      M_10_reparto: UtenteMyContext.A4_03_TabRig_Utenti_M_10_reparto,
      M_11_indirizzo: UtenteMyContext.A4_03_TabRig_Utenti_M_11_indirizzo,
      M_12_sn_chiave: UtenteMyContext.A4_03_TabRig_Utenti_M_12_sn_chiave,
      M_13_SMSBook: UtenteMyContext.A4_03_TabRig_Utenti_M_13_SMSBook,
      M_14_email: UtenteMyContext.A4_03_TabRig_Utenti_M_14_email,
      M_15_telefono_uno: UtenteMyContext.A4_03_TabRig_Utenti_M_15_telefono_uno,
      M_16_telefono_due: UtenteMyContext.A4_03_TabRig_Utenti_M_16_telefono_due,
    },
  };
  //FUNZIONE DI CONTROLLO E INVIO I DATI AL DATABASE PER NUOVO RECORD
  const submitData = async () => {
    if (!UtenteMyContext.A4_03_TabRig_Utenti_M_02_cognome) {
      return handleError("Il campo Cognome non può essere vuoto");
    } else if (!UtenteMyContext.A4_03_TabRig_Utenti_M_01_nome) {
      return handleError("Il campo Nome non può essere vuoto");
    } else if (!UtenteMyContext.A4_03_TabRig_Utenti_M_03_grado) {
      return handleError("Seleziona il Grado dell'utente");
    } else if (!UtenteMyContext.A4_03_TabRig_Utenti_M_10_reparto) {
      return handleError("Seleziona il Reparto dell'utente");
    } else if (!UtenteMyContext.A4_03_TabRig_Utenti_M_05_nome_utente) {
      return handleError("Il campo Nome utente non può essere vuoto");
    } else if (emailError === "Attenzione! Email non valida.") {
      setEmailError("");
      return handleError("Indirizzo Email inserito non valido");
    } else if (!password) {
      return handleError("Inserisci una password per questo utente");
    } else if (!confirmpass) {
      return handleError("Inserisci la conferma della password");
    } else if (confirmpass !== password) {
      setPasswordError("");
      return handleError("Le password non corrispondono");
    }
    try {
      axios.post("http://localhost:10200/nuovo-utente", A4_03_TabRig_Utenti);
    } catch (error) {
      console.log(error);
    }
    resetUtenteContext(UtenteMyContext);
    setShowPopUpEsito(true);
  };

  return (
    <div
      className="bg-gray-200 w-screen h-screen px-8 py-20  flex flex-col justify-between	"
      style={{ userSelect: "none" }}
    >
      <div className="h-fit flex justify-between items-center ">
        <p className="text-2xl ..."> NUOVO UTENTE</p>
        <div>
          <button
            onClick={() => submitData()}
            className="w-auto ml-2 focus:outline-none  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-1 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo"
          >
            SALVA
          </button>

          <button
            onClick={() => handleIndietro()}
            className="w-auto ml-2 focus:outline-none  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 my-1 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo"
          >
            ESCI
          </button>
        </div>
      </div>
      <div className="h-full " style={{ height: "calc(100% - 7rem)" }}>
        <form className="m-10">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2  text-base font-medium text-yellow-600 dark:text-white">
                *Cognome
              </label>
              <input
                value={valueCognome}
                onChange={handleChangeCognome}
                type="text"
                id="last_name"
                className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 focus:border-yellow-500 focus:border-2 focus:outline-none text-gray-900 text-sm rounded-3xl shadow-lg block w-full p-4"
                placeholder="..."
                required
              />
            </div>
            <div>
              <label className="block mb-2  text-base font-medium text-yellow-600 dark:text-white">
                *Nome
              </label>
              <input
                type="text"
                id="first_name"
                value={valueNome}
                onChange={handleChangeNome}
                className="bg-white hover:bg-gray-50 hover:border-gray-400 focus:border-2  focus:border-yellow-500 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-3xl  shadow-lg block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                placeholder="..."
                required
              />
            </div>
            <div className="flex flex-row  justify-between">
              <div className=" w-full mr-4">
                <label className="block mb-2  text-base font-medium text-yellow-600 dark:text-white">
                  *Grado
                </label>
                <select
                  required
                  id="grado"
                  value={valueGrado}
                  onChange={handleChangeGrado}
                  className="bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400   text-gray-900 text-sm rounded-3xl focus:border-2  focus:border-yellow-500 focus:outline-none block w-full p-4 shadow-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                >
                  <option value="" disabled>
                    Seleziona grado
                  </option>
                  <option value="COMANDANTE GENERALE">
                    Comandante Generale
                  </option>
                  <option value="COMMISSARIO SUPERIORE">
                    Commissario Superiore
                  </option>
                  <option value="COMMISSARIO CAPO">Commissario Capo</option>
                  <option value="COMMISSARIO GENERALE">
                    Commissario Generale
                  </option>
                  <option value="COMMISSARIO">Commissario</option>
                  <option value="VICE COMMISSARIO">Vice Commissario</option>
                  <option value="COMMISSARIO SUPERIORE NON COMANDANTE">
                    Commissario Superiore non Comandante
                  </option>
                  <option value="COMMISSARIO CAPO NON COMANDANTE">
                    Commissario Capo non Comandante
                  </option>
                  <option value="COMMISSARIO PRINCIPALE NON COMANDANTE">
                    Commissario Principale non Comandante
                  </option>
                  <option value="COMMISSARIO NON COMANDANTE">
                    Commissario non Comandante
                  </option>
                  <option value="VICE COMMISSARIO NON COMANDANTE">
                    Vice Commissario non Comandante
                  </option>
                  <option value="ISPETTORE CAPO COMANDANTE">
                    Ispettore Capo Comandante
                  </option>
                  <option value="ISPETTORE COMANDANTE">
                    Ispettore Comandante
                  </option>
                  <option value="VICE ISPETTORE COMANDANTE">
                    Vice Ispettore Comandante
                  </option>
                  <option value="ISPETTORE CAPO">Ispettore Capo</option>
                  <option value="ISPETTORE">Ispettore</option>
                  <option value="VICE SOVRINTENDENTE">
                    Vice Sovrintendente
                  </option>
                  <option value="SOVRINTENDENTE">Sovrintendente</option>
                  <option value="SOVRINTENDENTE CAPO">
                    Sovrintendente Capo
                  </option>
                  <option value="ASSISTENTE SCELTO">Assitente Scelto</option>
                  <option value="ASSISTENTE">Assistente</option>
                  <option value="AGENTE SCELTO">Agente Scelto</option>
                  <option value="AGENTE">Agente</option>
                  <option value="AGENTE STAGIONALE">Agente Stagionale</option>
                  <option value="OPERATORI ESTERNI'">Operatori Esterni</option>
                  <option value="AUSILIARI">Ausiliari</option>
                </select>
              </div>

              <div className=" w-full">
                <label className="block mb-2  text-base font-medium text-yellow-600 dark:text-white">
                  Matricola
                </label>
                <input
                  type="number"
                  id="matricola"
                  value={valueMatricola}
                  onChange={handleChangeMatricola}
                  className="bg-white  hover:bg-gray-50 hover:border-gray-400 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:border-2  focus:border-yellow-500 focus:outline-none block w-full shadow-lg p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  placeholder="12345"
                />
              </div>
            </div>
            <div className="flex flex-row ">
              {["Telefono 1", "Telefono 2"].map((label, index) => (
                <div
                  key={index}
                  className={`relative  w-full ${index === 0 ? "mr-4" : ""}`}
                >
                  <label className="block mb-2 text-base font-medium text-yellow-600 dark:text-white">
                    {label}
                  </label>
                  <div className="relative w-full ">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="text"
                      className="bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-900 text-sm rounded-3xl focus:border-2 focus:border-yellow-500 focus:outline-none block w-full mr-1 sm:m-0 md:mr-1 pl-10 p-4 shadow-lg"
                      placeholder="123-4567890"
                      value={
                        index === 0
                          ? valueTelefono_1
                          : index === 1
                          ? valueTelefono_2
                          : ""
                      }
                      onChange={
                        index === 0
                          ? handleChangeTelefono_1
                          : handleChangeTelefono_2
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row  justify-between">
              <div className=" w-full mr-4">
                <label className="block mb-2  text-base font-medium text-yellow-600 ">
                  *Reparto
                </label>
                <select
                  required
                  id="reparto"
                  value={valueReparto}
                  onChange={handleChangeReparto}
                  className="bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-900 text-sm rounded-3xl focus:border-2  focus:border-yellow-500 focus:outline-none block w-full p-4 shadow-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="" disabled>
                    Seleziona Reparto
                  </option>
                  <option value="UFFICIALI">Ufficiali</option>
                  <option value="B - AUSILIARI'">B - Ausiliari</option>
                  <option value="C - AMMINISTRATIVI'">C- Amministrativi</option>
                  <option value="A - POLIZIA'">A- Polizia</option>
                  <option value="OPERATORI ESTERNI'">Operatori Esterni</option>
                  <option value="UFFICIO INF-VIAB">
                    Ufficio Informazioni e Viabilità
                  </option>
                  <option value="UFFICIO ED-AMB'">
                    Ufficio Educazione Ambientale
                  </option>
                  <option value="UFFICIO CTR'">
                    Ufficio Controllo Territorio
                  </option>
                  <option value="UFFICIO VIGILANZA' ">Ufficio Vigilanza</option>
                  <option value="UFFICIO ACCERTAMENTI'">
                    Ufficio Accertamenti
                  </option>
                  <option value="UFFICIO PG-S.URB'">
                    Ufficio Pianificazione e Gestione Sviluppo Urbano
                  </option>
                  <option value="UFFICIO SEGR-COM'">
                    Ufficio Segreteria e Comando
                  </option>
                  <option value="PRONTO INTERVENTO">Pronto Intervento</option>
                  <option value="PROTEZIONE CIVILE E RISCHIO INDUSTRIALE">
                    Protezione Civile e Rischio Industriale
                  </option>
                  <option value="AFFARI INTERNI, LOGISTICA E RISORSE UMANE">
                    Affari Interni, Logistica e Risorse Umane
                  </option>
                  <option value="POLIZIA GIUDIZIARIA-INVESTIGATIVA-EMERGENZE SOCIALI">
                    Polizia Giudiziaria-Investigativa-Emergenze Sociali
                  </option>
                  <option value="POLIZIA DI PROSSIMITÀ">
                    Polizia di Prossimità
                  </option>
                  <option value="RADIOMOBILE'">Radiomobile</option>
                  <option value="SICUREZZA STRADALE'">
                    Sicurezza Stradale
                  </option>
                  <option value="SICUREZZA URBANA'">Sicurezza Urbana</option>
                  <option value="LABORATORIO AN-DOC'">
                    Laboratorio Analisi Documentale
                  </option>
                  <option value="POLIZIA COMMERCIALE'">
                    Polizia Commerciale
                  </option>
                </select>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <div className=" w-full mr-3">
                  <label className="block mb-2  text-base font-medium text-yellow-600 dark:text-white">
                    S/N Chiave
                  </label>
                  <input
                    type="text"
                    value={valueSNChiave}
                    onChange={handleChangeSNChiave}
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-3xl  hover:bg-gray-50  hover:border-gray-400  focus:border-2  focus:border-yellow-500 focus:outline-none lock w-full p-4  shadow-lg"
                    placeholder="12345"
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <label className="block mb-5 text-base text-center font-medium text-yellow-600 dark:text-white">
                    SMSBook
                  </label>
                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={valueSMSBook === 1}
                      onChange={handleChangeSMSBook}
                      className="sr-only peer"
                    />
                    <div className="relative ml-4 w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full shadow-md rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                  </label>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                  <label className="block mb-5 text-base text-center font-medium text-yellow-600 dark:text-white">
                    ATTIVO
                  </label>
                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={valueAttivo === 1}
                      onChange={handleChangeAttivo}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 ml-4 self-center bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 shadow-md peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row  justify-between">
              <div className="w-full mr-4 relative">
                <label className="block mb-2 text-base font-medium text-yellow-600 dark:text-white">
                  Indirizzo
                </label>
                <InputIndirizzo
                  thisState={
                    UtenteMyContext?.A4_03_TabRig_Utenti_M_11_indirizzo
                  }
                  thisSetState={
                    UtenteMyContext?.setA4_03_TabRig_Utenti_M_11_indirizzo
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row  justify-between">
            <div className="mb-6 w-full mr-6">
              <label className="block mb-2  text-base font-medium text-yellow-600 dark:text-white">
                *Nome utente
              </label>
              <input
                type="username"
                id="username"
                value={valueNomeUtente}
                onChange={handleChangeNuovoUtente}
                className="bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-900 text-sm rounded-3xl focus:border-2  focus:border-yellow-500 focus:outline-none block w-full p-4 shadow-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="..."
                required
              />
            </div>
            <div className="w-full relative">
              <label className="block mb-2  text-base font-medium text-yellow-600 dark:text-white ">
                Email
              </label>
              <div>
                <input
                  type="email"
                  id="email"
                  value={valueEmail}
                  onChange={handleChangeEmail}
                  placeholder="xxx@xxx.com"
                  className={`bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-900 text-sm rounded-s-3xl rounded-e-3xl px-4 focus:border-2  focus:border-yellow-500 focus:outline-none block w-full p-4 shadow-lg ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {emailError && (
                  <p className="mt-2 text-sm font-bold text-center text-red-600">
                    {emailError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="mb-6 w-full mr-6">
              <label className="block mb-2 text-base font-medium text-yellow-600 dark:text-white">
                *Password
              </label>

              <input
                type="password"
                id="password"
                value={password}
                placeholder="..."
                required
                onChange={handlePasswordChange}
                className={`bg-white hover:bg-gray-50 hover:border-gray-400 border border-gray-300 text-gray-900 text-sm  rounded-s-3xl rounded-e-3xl focus:border-2  focus:border-yellow-500 focus:outline-none block w-full p-4 shadow-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block mb-2 text-base font-medium text-yellow-600 dark:text-white">
                *Confirm password
              </label>
              <input
                type="password"
                id="confirmpass"
                value={confirmpass}
                placeholder="..."
                required
                onChange={handleConfirmPasswordChange}
                className={`bg-white border border-gray-300  rounded-s-3xl rounded-e-3xl hover:bg-gray-50 hover:border-gray-400 text-gray-900 text-sm focus:border-2  focus:border-yellow-500 focus:outline-none block w-full p-4 shadow-lg ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {passwordError && (
                <p className="mt-2 text-sm font-bold text-center text-red-600">
                  {passwordError}
                </p>
              )}
            </div>
          </div>
          <div className="text-sm font-bold text-red-600 flex justify-end ">
            *Campi obbligatori.
          </div>
        </form>
      </div>

      {showModal && (
        <div
          id="popup-modal"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 "
        >
          <div className="relative p-4 w-full max-w-md max-h-full ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <span className=" flex flex-1 justify-center mx-auto mb-4  text-gray-400 w-12 h-12 dark:text-gray-200 self-center">
                  <IoAlertCircleOutline
                    size={50}
                    color="lightblue"
                    className="flex flex-1 justify-center self-center"
                  />
                </span>

                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Si prega di compilare tutti i campi obbligatori.
                </h3>

                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border-b-4 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  Ok, capito!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPopUpEsito && (
        <EsitoPopUp
          title={"OTTIMO !!"}
          message={`Nuovo utente ${UtenteMyContext.A4_03_TabRig_Utenti_M_05_nome_utente} creato con successo`}
          onClose={closeEsitoPopUp}
        />
      )}
      {showError && (
        <ErrorPopup
          title={"ATTENZIONE !!"}
          message={messaggioPopUp}
          onClose={closeErrorPopup}
        />
      )}
    </div>
  );
};

export default NuovoUtente;
