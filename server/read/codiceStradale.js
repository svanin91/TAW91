import axios from "axios";
const url =
  "https://srv04/fmi/data/v2/databases/TAW91/layouts/A4_04_CDS/records?_offset=1&_limit=265";

// QUESTA CHIAMATA PRELEVA DAL DB IL CODICE DELLA STRADA

const codiceStradale = async (token, req, res) => {
  console.log("func");
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
    res.send(response.data.response.data);
  } catch (error) {
    console.log("errore! ", error.message);
    res.send({ errore: error });
  }
};
export default codiceStradale;
