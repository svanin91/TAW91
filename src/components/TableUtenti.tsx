import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, NavigateOptions } from "react-router-dom";

interface DataProps {
  fieldData: {
    M_01_nome: string;
    M_02_cognome: string;
    M_03_grado: number;
    M_04_matricola: string;
    M_05_nome_utente: string;
    M_07_attivo: number;
    M_10_reparto: string;
    M_11_indirizzo: string;
    M_12_sn_chiave: number;
    M_13_SMSBook: string;
    M_14_email: string;
    M_15_telefono_uno: string;
    M_16_telefono_due: string;
  };
}

const TableUtenti = (props: {
  data: DataProps[] | [];
  setData: React.Dispatch<React.SetStateAction<DataProps[] | []>>;
}) => {
  const navigate = useNavigate();
  const { data, setData } = props;
  // Funzione per ordinare l'array in base a M_02_cognome
  data?.sort((a, b) => {
    const cognomeA = a.fieldData.M_02_cognome.toUpperCase(); // Ignora maiuscole e minuscole
    const cognomeB = b.fieldData.M_02_cognome.toUpperCase(); // Ignora maiuscole e minuscole
    if (cognomeA < cognomeB) {
      return -1;
    }
    if (cognomeA > cognomeB) {
      return 1;
    }
    return 0;
  });

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDownloadRecords, setStartDownloadRecords] = useState(101);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const override = css`
    display: block,
    margin: 0 auto
  `;

  const lanciaLogeNaviga = async (item: any) => {
    setLoading(true);
    navigate(`/utente/${item.fieldData.M_01_nome}`, {
      state: {
        datiUtente: item.fieldData,
      },
      replace: true,
    } as NavigateOptions);

    setLoading(false);
  };

  const renderUtenti = () => {
    return data?.length > 0 ? (
      data.map((item: DataProps, index: number) => (
        <React.Fragment key={index}>
          <tbody
            className={`divide-y divide-gray-200 bg-gray-200 hover:bg-gray-300`}
            onClick={() => {
              lanciaLogeNaviga(item);
            }}
          >
            <tr>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.M_02_cognome}
              </td>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.M_01_nome}
              </td>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.M_05_nome_utente}
              </td>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.M_04_matricola}
              </td>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.M_03_grado}
              </td>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.M_10_reparto}
              </td>

              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.M_07_attivo ? (
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
              </td>
            </tr>
          </tbody>
        </React.Fragment>
      ))
    ) : (
      <tbody>
        <tr>
          <td
            colSpan={6}
            className="px-3 py-4 text-sm text-gray-800 text-center"
          >
            Nessun dato disponibile
          </td>
        </tr>
      </tbody>
    );
  };

  const loadMoreRecords = async () => {
    if (conteggio >= startDownloadRecords) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:10200/getOtherRecordsTable",
          { startDownloadRecords: startDownloadRecords }
        );
        setData((prevData) => [...prevData, ...response.data]);
        setStartDownloadRecords((prevPage) => prevPage + 100);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  /**
   * funzione che rileva lo scroll
   */

  const handleScroll = () => {
    const table = tableRef.current;
    if (
      table &&
      table.scrollHeight - (table.scrollTop + table.clientHeight) < 10 &&
      !isLoading
    ) {
      loadMoreRecords();
    }
  };

  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      table.addEventListener("scroll", handleScroll);

      return () => {
        table.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isLoading, setData]);

  return loading ? (
    <div className="spinner flex justify-center items-center	w-full h-full">
      <BeatLoader
        color={"rgb(223, 166, 0)"}
        loading={loading}
        cssOverride={override}
        size={30}
      />
    </div>
  ) : (
    <div className="flex flex-col pt-4 ">
      <div className="p-1.5 h-full w-full inline-block align-middle ">
        <div
          ref={tableRef}
          className={`overflow-auto border rounded-lg border-black block max-h-[710px] h-full`}
        >
          <table className="classe-tabella min-w-full divide-y divide-black border-b border-black">
            <thead className="bg-gray-50 h-12 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-24 "
                >
                  Cognome
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-24 "
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-20 "
                >
                  Nome utente
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-16 "
                >
                  Matricola
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-24 "
                >
                  Grado
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-32 "
                >
                  Reparto
                </th>

                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-20 "
                >
                  Attivo
                </th>
              </tr>
            </thead>
            {renderUtenti()}
          </table>
        </div>
      </div>
    </div>
  );
};
export default TableUtenti;
