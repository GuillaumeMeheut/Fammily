import { NextPageContext } from "next";
import { useState } from "react";
import { myGetAdmin } from "../../../api/myGetAdmin";
import styles from "./admin.module.scss";
import Navbar from "../../components/navbarAdmin";
import Input from "../../components/input";
import Router from "next/router";
import Layout from "./../../components/Layout/Layout";

function adminEntreprises({ entreprises }) {
  console.log(entreprises);

  const [id, setEntrepriseID] = useState();
  const [nom, setNom] = useState("");
  const [siren, setSiren] = useState("");
  const [ville, setVille] = useState("");
  const [departement, setDepartement] = useState("");
  const [mail, setMail] = useState("");
  const [tel, setTel] = useState("");

  const [message, setMessage] = useState("");

  const modifyEntreprise = async () => {
    const rawResponse = await fetch(`/api/adminAPI/modifyEntreprise`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        nom,
        siren,
        ville,
        departement,
        mail,
        tel,
      }),
    });
    const content = await rawResponse.json();
    setMessage(content.message);
  };

  const delEntreprise = async () => {
    const rawResponse = await fetch(`/api/adminAPI/delEntreprise`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const content = await rawResponse.json();
    setMessage(content.message);
  };

  const createEntreprise = async () => {
    const rawResponse = await fetch(`/api/adminAPI/createEntreprise`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        siren,
        ville,
        departement,
        mail,
        tel,
      }),
    });
    const content = await rawResponse.json();
    setMessage(content.message);
    Router.reload();
  };

  const handleChangeEntrepriseID = (event) => {
    const [selectId, entrepriseId] = event.target.value.split(",");
    setEntrepriseID(entrepriseId);
    setNom(entreprises[selectId - 1].nom);
    setSiren(entreprises[selectId - 1].siren);
    setVille(entreprises[selectId - 1].ville);
    setDepartement(entreprises[selectId - 1].departement);
    setMail(entreprises[selectId - 1].mail);
    setTel(entreprises[selectId - 1].tel);
  };

  return (
    <Layout>
      <div>
        <Navbar />
        <h4>Changer une entreprise ?</h4>
        <p>Quel entreprise changer ?</p>
        <select onChange={(ev) => handleChangeEntrepriseID(ev)} name="offres">
          <option>Choissisez une entreprise</option>
          {entreprises.map((entreprise, index) => {
            return (
              <option value={`${Number(index + 1)},${entreprise.id}`}>{entreprise.nom}</option>
            );
          })}
        </select>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="nom">
            Nom de l'entreprise
          </label>
          <Input
            type={"text"}
            name={"nom"}
            placeholder="nom"
            value={nom}
            onChange={(ev) => setNom(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="siren">
            SIREN
          </label>
          <Input
            type={"text"}
            name={"siren"}
            placeholder="siren"
            value={siren}
            onChange={(ev) => setSiren(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="ville">
            Ville
          </label>
          <Input
            type={"text"}
            name={"ville"}
            placeholder="ville"
            value={ville}
            onChange={(ev) => setVille(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="departement">
            Département
          </label>
          <Input
            type={"text"}
            name={"departement"}
            placeholder="departement"
            value={departement}
            onChange={(ev) => setDepartement(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="mail">
            Mail
          </label>
          <Input
            type={"text"}
            name={"mail"}
            placeholder="mail"
            value={mail}
            onChange={(ev) => setMail(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="tel">
            Téléphone
          </label>
          <Input
            type={"text"}
            name={"tel"}
            placeholder="tel"
            value={tel}
            onChange={(ev) => setTel(ev.target.value)}
          />
        </div>
        <p>{message}</p>
        <button
          className={`${styles.button} ${styles.buttonModif}`}
          onClick={() => modifyEntreprise()}
        >
          Apporter les modification a l'entreprise {nom}
        </button>
        <button
          className={`${styles.button} ${styles.buttonDelete}`}
          onClick={() => delEntreprise()}
        >
          Supprimer l'entreprise {nom}
        </button>
        <button
          className={`${styles.button} ${styles.buttonNew}`}
          onClick={() => createEntreprise()}
        >
          Créer une nouvelle entreprise
        </button>
      </div>
    </Layout>
  );
}

export default adminEntreprises;

export async function getServerSideProps(ctx: NextPageContext) {
  const entreprises = await myGetAdmin(`${process.env.adress}api/adminAPI/getEntreprises`, ctx);

  return {
    props: {
      entreprises,
    },
  };
}
