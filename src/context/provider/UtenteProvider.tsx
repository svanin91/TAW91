import React, { useState } from "react";
import { UtenteContext } from "../UtenteContext";

export const UtenteProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [A4_03_TabRig_Utenti_id_record, setA4_03_TabRig_Utenti_id_record] =
    useState<number | undefined>(undefined);
  const [A4_03_TabRig_Utenti_M_01_nome, setA4_03_TabRig_Utenti_M_01_nome] =
    useState("");
  const [
    A4_03_TabRig_Utenti_M_02_cognome,
    setA4_03_TabRig_Utenti_M_02_cognome,
  ] = useState("");
  const [A4_03_TabRig_Utenti_M_03_grado, setA4_03_TabRig_Utenti_M_03_grado] =
    useState("");
  const [
    A4_03_TabRig_Utenti_M_04_matricola,
    setA4_03_TabRig_Utenti_M_04_matricola,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_05_nome_utente,
    setA4_03_TabRig_Utenti_M_05_nome_utente,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_06_password,
    setA4_03_TabRig_Utenti_M_06_password,
  ] = useState<string>("");
  const [A4_03_TabRig_Utenti_M_07_attivo, setA4_03_TabRig_Utenti_M_07_attivo] =
    useState<number>(1);
  const [
    A4_03_TabRig_Utenti_M_08_data_ultimo_accesso,
    setA4_03_TabRig_Utenti_M_08_data_ultimo_accesso,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_09_ora_ultimo_accesso,
    setA4_03_TabRig_Utenti_M_09_ora_ultimo_accesso,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_10_reparto,
    setA4_03_TabRig_Utenti_M_10_reparto,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_11_indirizzo,
    setA4_03_TabRig_Utenti_M_11_indirizzo,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_12_sn_chiave,
    setA4_03_TabRig_Utenti_M_12_sn_chiave,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_13_SMSBook,
    setA4_03_TabRig_Utenti_M_13_SMSBook,
  ] = useState(0);
  const [A4_03_TabRig_Utenti_M_14_email, setA4_03_TabRig_Utenti_M_14_email] =
    useState("");
  const [
    A4_03_TabRig_Utenti_M_15_telefono_uno,
    setA4_03_TabRig_Utenti_M_15_telefono_uno,
  ] = useState("");
  const [
    A4_03_TabRig_Utenti_M_16_telefono_due,
    setA4_03_TabRig_Utenti_M_16_telefono_due,
  ] = useState("");

  return (
    <UtenteContext.Provider
      value={{
        A4_03_TabRig_Utenti_id_record,
        setA4_03_TabRig_Utenti_id_record,
        A4_03_TabRig_Utenti_M_01_nome,
        setA4_03_TabRig_Utenti_M_01_nome,
        A4_03_TabRig_Utenti_M_02_cognome,
        setA4_03_TabRig_Utenti_M_02_cognome,
        A4_03_TabRig_Utenti_M_03_grado,
        setA4_03_TabRig_Utenti_M_03_grado,
        A4_03_TabRig_Utenti_M_04_matricola,
        setA4_03_TabRig_Utenti_M_04_matricola,
        A4_03_TabRig_Utenti_M_05_nome_utente,
        setA4_03_TabRig_Utenti_M_05_nome_utente,
        A4_03_TabRig_Utenti_M_06_password,
        setA4_03_TabRig_Utenti_M_06_password,
        A4_03_TabRig_Utenti_M_07_attivo,
        setA4_03_TabRig_Utenti_M_07_attivo,
        A4_03_TabRig_Utenti_M_08_data_ultimo_accesso,
        setA4_03_TabRig_Utenti_M_08_data_ultimo_accesso,
        A4_03_TabRig_Utenti_M_09_ora_ultimo_accesso,
        setA4_03_TabRig_Utenti_M_09_ora_ultimo_accesso,
        A4_03_TabRig_Utenti_M_10_reparto,
        setA4_03_TabRig_Utenti_M_10_reparto,
        A4_03_TabRig_Utenti_M_11_indirizzo,
        setA4_03_TabRig_Utenti_M_11_indirizzo,
        A4_03_TabRig_Utenti_M_12_sn_chiave,
        setA4_03_TabRig_Utenti_M_12_sn_chiave,
        A4_03_TabRig_Utenti_M_13_SMSBook,
        setA4_03_TabRig_Utenti_M_13_SMSBook,
        A4_03_TabRig_Utenti_M_14_email,
        setA4_03_TabRig_Utenti_M_14_email,
        A4_03_TabRig_Utenti_M_15_telefono_uno,
        setA4_03_TabRig_Utenti_M_15_telefono_uno,
        A4_03_TabRig_Utenti_M_16_telefono_due,
        setA4_03_TabRig_Utenti_M_16_telefono_due,
      }}
    >
      {children}
    </UtenteContext.Provider>
  );
};
