import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import TableCDS from "../components/TableCDS";
import { css } from "@emotion/react";

const Cds: React.FC = () => {
  const navigate = useNavigate();
  const [cds, setCds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Stato per il caricamento

  const override = css`
  display: block,
  margin: 0 auto
`;

  useEffect(() => {
    fetchData();
  }, []);

  // CHIAMATA PER RECUPERARE DAL DB IL CODICE DELLA STRADA

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:10200/codiceStradale");
      setCds(response.data);
    } catch (error) {
      console.error("Error fetching apiData:", error);
    } finally {
      setLoading(false); // Nascondi lo skeleton loader dopo il caricamento dei dati
    }
  };

  return (
    <div
      className="bg-gray-200 w-screen h-screen px-8 py-20  flex flex-col justify-between	"
      style={{ userSelect: "none" }}
    >
      <div className="h-fit flex justify-between items-center ">
        <p className="text-2xl ...">CODICE DELLA STRADA</p>
        <div>
          <button
            onClick={() => navigate("/TAW91")}
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
          <TableCDS data={cds} setData={setCds} />
        </div>
      )}
    </div>
  );
};
export default Cds;
