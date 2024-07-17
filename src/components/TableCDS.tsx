import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, NavigateOptions } from "react-router-dom";

interface DataProps {
  fieldData: {
    B_01_codice_articolo: string;
    B_02_titolo_articolo: string;
    id_record: number;
  };
}
const TableCDS = (props: {
  data: DataProps[] | [];
  setData: React.Dispatch<React.SetStateAction<DataProps[] | []>>;
}) => {
  const { data, setData } = props;

  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const override = css`
      display: block,
      margin: 0 auto
    `;

  const renderCDS = () => {
    return data?.length > 0 ? (
      data.map((item: DataProps, index: number) => (
        <React.Fragment key={index}>
          <tbody
            className={`divide-y divide-gray-200 bg-gray-200 hover:bg-gray-300`}
          >
            <tr>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.B_01_codice_articolo}
              </td>
              <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                {item.fieldData.B_02_titolo_articolo}
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
                  Articolo
                </th>
                <th
                  scope="col"
                  className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase w-24 "
                >
                  Descrizione
                </th>
              </tr>
            </thead>
            {renderCDS()}
          </table>
        </div>
      </div>
    </div>
  );
};
export default TableCDS;
