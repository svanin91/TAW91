import { useNavigate, NavigateOptions } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useState } from "react";

const ModificaPopUp = ({ message, onClose, title, datiUtente }) => {
  /**
   * questo é un componente che permette la generazione di pop up
   */
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const override = css`
  display: block,
  margin: 0 auto
`;

  // CHIAMATA CHE LANCIA LA MODIFICA DELL UTENTE CON I DATI INSERITI

  const confermaModifica = async () => {
    setLoading(true);
    navigate(`/modifica-utente/${datiUtente.M_05_nome_utente}`, {
      state: {
        datiUtente: datiUtente,
      },
      replace: true,
    } as NavigateOptions);
    onClose();
  };
  return loading ? (
    <div
      className="spinner flex fixed inset-0 z-10 justify-center items-center	w-full h-full"
      style={{ userSelect: "none" }}
    >
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
      <BeatLoader
        color={"rgb(223, 166, 0)"}
        loading={loading}
        cssOverride={override}
        size={30}
      />
    </div>
  ) : (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center"
      style={{ userSelect: "none" }}
    >
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"
              />
            </svg>
            <h3 className="mb-5 text-2xl font-normal text-red-500 dark:text-gray-400">
              Modifica
            </h3>
            <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              {message}
            </p>{" "}
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={() => confermaModifica()}
              className=" bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Confermo
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificaPopUp;

/*
    <div className="spinner flex fixed inset-0 z-10 justify-center items-center	w-full h-full">
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
      <BeatLoader
        color={"rgb(223, 166, 0)"}
        loading={loading}
        cssOverride={override}
        size={30}
      />
    </div>
  ) : (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
      <div className="bg-white rounded-lg p-4 max-w-md mx-auto z-20">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-center">
          <p className="text-red-500 font-bold text-lg mb-2">{title}</p>
          <p className="text-gray-700">{message}</p>
          <div className="mt-4 ">
            <button
              className="w-16 mr-2 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => confermaModifica(idControllo)}
            >
              SI
            </button>
            <button
              className="w-16 ml-2 bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo font-medium rounded-lg text-sm px-4 py-2"
              onClick={onClose}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
    */
