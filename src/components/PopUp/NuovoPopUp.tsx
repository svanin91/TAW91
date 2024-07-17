import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";

const NuovoPopUp = ({ message, onClose, title }) => {
  /**
   * questo é un componente che permette la generazione di pop up
   */
  const navigate = useNavigate();

  const override = css`
  display: block,
  margin: 0 auto
`;

  return (
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
              />
            </svg>
            <h3 className="mb-5 text-2xl font-normal text-red-500 dark:text-gray-400">
              Aggiungi nuovo
            </h3>
            <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              Vuoi aggiungere un nuovo utente ?
            </p>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={() => navigate("/nuovo-utente")}
              className=" bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Confermo
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Annulla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuovoPopUp;
/*
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
              onClick={() => lanciaScriptNuovoRecord()}
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
