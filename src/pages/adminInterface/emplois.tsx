import { NextPageContext } from "next";
import { useState } from "react";
import { myGetAdmin } from "../../../api/myGetAdmin";
import styles from "./admin.module.scss";
import Navbar from "../../components/navbarAdmin";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Router from "next/router";
import Layout from "./../../components/Layout/Layout";

function adminOffres({ offres, entreprises }) {
  const [id, setOffreID] = useState();
  const [titre, setTitre] = useState("");
  const [lieu, setLieu] = useState("");
  const [domaine, setDomaine] = useState("");
  const [description, setDescription] = useState("");
  const [entrepriseId, setEntrepriseId] = useState(Number);

  const [message, setMessage] = useState("");

  const modifyOffre = async () => {
    const rawResponse = await fetch(`/api/adminAPI/modifyOffre`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        titre,
        lieu,
        domaine,
        description,
        entrepriseId,
      }),
    });
    const content = await rawResponse.json();
    setMessage(content.message);
  };

  const delOffre = async () => {
    const rawResponse = await fetch(`/api/adminAPI/delOffre`, {
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

  const createOffre = async () => {
    const rawResponse = await fetch(`/api/adminAPI/createOffre`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titre,
        lieu,
        domaine,
        description,
        entrepriseId,
      }),
    });
    const content = await rawResponse.json();
    setMessage(content.message);
    Router.reload();
  };

  const handleChangeoffreID = (event) => {
    const [selectId, offreId] = event.target.value.split(",");
    setOffreID(offreId);
    setTitre(offres[selectId - 1].titre);
    setLieu(offres[selectId - 1].lieu);
    setDomaine(offres[selectId - 1].domaine);
    setDescription(offres[selectId - 1].description);
    setEntrepriseId(offres[selectId - 1].entrepriseId);
  };

  return (
    <Layout>
      <div>
        <Navbar />
        <h4>Changer une offre</h4>
        <p>Quel offre changer ?</p>
        <select onChange={(ev) => handleChangeoffreID(ev)} name="offres">
          <option>Choissisez une offre</option>
          {offres.map((offre, index) => {
            return <option value={`${Number(index + 1)},${offre.id}`}>{offre.titre}</option>;
          })}
        </select>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="titre">
            Titre de l'annonce
          </label>
          <Input
            type={"text"}
            name={"titre"}
            placeholder="titre"
            value={titre}
            onChange={(ev) => setTitre(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="titre">
            Lieu
          </label>
          <Input
            type={"text"}
            name={"lieu"}
            placeholder="lieu"
            value={lieu}
            onChange={(ev) => setLieu(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="domaine">
            Domaine
          </label>
          <select
            id="domaine"
            className={styles.select}
            name="domaine"
            onChange={(ev) => setDomaine(ev.target.value)}
          >
            <option value={domaine}>{domaine}</option>
            <option value="Generaliste">Généraliste</option>
            <option value="Graphisme">Graphisme</option>
            <option value="Developpement">Développement</option>
            <option value="Communication">Communication</option>
            <option value="Audiovisuel">Audiovisuel</option>
            <option value="Photographie">Photographie</option>
            <option value="Autres">Autres</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <Textarea
            name={"description"}
            placeholder="description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>
        <select
          onChange={(ev) => {
            setEntrepriseId(Number(ev.target.value));
          }}
          name="entreprise"
        >
          <option value={entrepriseId}>
            {entrepriseId ? entreprises.find((e) => e.id === entrepriseId).nom : "Pas d'entreprise"}
          </option>
          {entreprises.map((entreprise) => {
            return <option value={entreprise.id}>{entreprise.nom}</option>;
          })}
        </select>
        <p>{message}</p>
        <button className={`${styles.button} ${styles.buttonModif}`} onClick={() => modifyOffre()}>
          Apporter les modification a l'offre {titre}
        </button>
        <button className={`${styles.button} ${styles.buttonDelete}`} onClick={() => delOffre()}>
          Supprimer l'offre {titre}
        </button>
        <button className={`${styles.button} ${styles.buttonNew}`} onClick={() => createOffre()}>
          Créer une nouvelle offre
        </button>
      </div>
    </Layout>
  );
}

export default adminOffres;

export async function getServerSideProps(ctx: NextPageContext) {
  const offres = await myGetAdmin(`${process.env.adress}api/adminAPI/getOffres`, ctx);
  const entreprises = await myGetAdmin(`${process.env.adress}api/adminAPI/getEntreprises`, ctx);

  return {
    props: {
      offres,
      entreprises,
    },
  };
}
