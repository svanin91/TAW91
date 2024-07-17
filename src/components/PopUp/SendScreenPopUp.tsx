const SendScreenPopUp = ({
  title,
  messaggioPopUpSendScreen,
  setMessaggioPopUpSendScreen,
  image,
  onClose,
  onSend,
}) => {
  const handleTextareaChange = (event) => {
    setMessaggioPopUpSendScreen(event.target.value);
  };
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center"
      style={{ userSelect: "none" }}
    >
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="md:p-4 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="rgb(254, 221, 20)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <p className="mb-6">
              Ricevuta la richiesta la elaboreremo il prima possibile.
              <br />
              Grazie per la tua pazienza.
            </p>
            {image && <img src={image} alt="Screenshot" className="mb-6" />}
            <p className="pb-4">Descrivi la problematica riscontrata</p>
            <textarea
              placeholder="..."
              className="w-full p-2 mb-2 h-32 rounded text-black text-base border-2 border-black"
              value={messaggioPopUpSendScreen}
              onChange={handleTextareaChange}
            ></textarea>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onSend}
                className="bg-gialloSofitel text-black border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo font-medium rounded-lg text-sm px-4 py-2"
              >
                Invia Richiesta
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendScreenPopUp;
/**
 * <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>


 */

/*
const SendScreenPopUp = ({ message, onClose, title, image }) => {

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-50 fixed inset-0"></div>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
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
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-2xl font-normal text-red-500 dark:text-gray-400">
              {title}
            </h3>
            <p className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
              {message}
            </p>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={onClose}
              className=" bg-gialloSofitel border-2 border-gialloBordo hover:bg-gialloBordo hover:border-gialloBordo focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendScreenPopUp;
*/
