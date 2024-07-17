import axios from "axios";
const url =
  "https://srv04/fmi/data/v2/databases/TAW91/layouts/A4_03_TabRig_Utenti/records";

// QUESTA CHIAMATA PRELEVA TUTTI GLI UTENTI A DB

const listaUtenti = async (token, req, res) => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: req.body,
  };
  try {
    const response = await axios(config);

    res.send(response.data.response);
  } catch (error) {
    console.log("errore! ", error.message);
    res.send({ errore: error });
  }
};

export default listaUtenti;
