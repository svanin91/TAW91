import { useContext } from "react";
import { LoggedContext } from "../context/LoggedContext";
import { Link } from "react-router-dom";
import data from "../../public/ini/ini.json";
import resetLoggedContext from "../context/reset/ResetLoggedContext";

function Header() {
  const LoggedMyContext = useContext(LoggedContext);

  const logLogoutClick = async () => {
    resetLoggedContext(LoggedMyContext);
    LoggedMyContext.setLogOutClick(true);
    LoggedMyContext.setIsLogged(false);
  };

  return (
    <div
      className="bg-gialloSofitel flex items-center w-screen justify-between h-14 px-3 object-top 
    absolute inset-x-0 top-0 border-b-4 border-gialloBordo"
    >
      <Link to="http://localhost:3000/COM38">
        <img src={data.header.Logo_sofitel} className="h-36" />
      </Link>
      {LoggedMyContext.isLogged ? (
        <img src={data.header.Logo_gruppo_software} className="h-10" />
      ) : null}
      {LoggedMyContext.isLogged ? (
        <div className="flex items-center">
          <p className="pr-2 text-lg" style={{ userSelect: "none" }}>
            {data.header.Nome_comune}
          </p>
          <img src={data.header.Logo_comune} className="h-10" />
          <p className="pl-2 text-lg" style={{ userSelect: "none" }}>
            Comando Polizia Locale
          </p>
        </div>
      ) : null}
      {LoggedMyContext.isLogged ? (
        <div className="bg-white h-8 items-center flex px-10 border-2 border-gray-700 rounded-lg">
          <p style={{ userSelect: "none" }}>
            {LoggedMyContext.A4_03_TabRig_utenti_M_10_cognome_nome.toUpperCase()}
          </p>
        </div>
      ) : null}
      {LoggedMyContext.isLogged ? (
        <Link to="http://localhost:3000/COM38">
          <button
            onClick={logLogoutClick}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-4 rounded-lg"
          >
            Logout
          </button>
        </Link>
      ) : null}
    </div>
  );
}
export default Header;
