import { NextPageContext } from "next";
import { useState } from "react";
import { myGetAdmin } from "../../../api/myGetAdmin";
import styles from "./admin.module.scss";
import Navbar from "../../components/navbarAdmin";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Layout from "./../../components/Layout/Layout";

function adminProfils({ profils }) {
  const [id, setProfilID] = useState();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [domaine, setDomaine] = useState("");
  const [bac, setBac] = useState("");
  const [promo, setPromo] = useState(Number);
  const [description, setDescription] = useState("");
  const [metier, setMetier] = useState("");
  const [conseil, setConseil] = useState("");
  const [active, setActive] = useState(Boolean);
  const [etudiant, setEtudiant] = useState(Boolean);
  const [admin, setAdmin] = useState(Boolean);

  const [message, setMessage] = useState("");

  const modifyProfil = async () => {
    const rawResponse = await fetch(`/api/adminAPI/modifyProfil`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        nom,
        prenom,
        domaine,
        bac,
        promo,
        metier,
        description,
        conseil,
        active,
        etudiant,
        admin,
      }),
    });
    const content = await rawResponse.json();
    setMessage(content.message);
  };
  const deleteProfil = async () => {
    const rawResponse = await fetch(`/api/adminAPI/delProfil`, {
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

  const handleChangeprofilID = (event) => {
    const [selectId, profilId] = event.target.value.split(",");
    setProfilID(profilId);
    setNom(profils[selectId - 1].nom);
    setPrenom(profils[selectId - 1].prenom);
    setDomaine(profils[selectId - 1].domaine);
    setBac(profils[selectId - 1].bac);
    setPromo(profils[selectId - 1].promo);
    setMetier(profils[selectId - 1].metier);
    setDescription(profils[selectId - 1].description);
    setConseil(profils[selectId - 1].conseil);
    setActive(profils[selectId - 1].activate);
    setEtudiant(profils[selectId - 1].etudiant);
    setAdmin(profils[selectId - 1].isAdmin);
  };

  return (
    <Layout>
      <div>
        <Navbar />
        <h4>Changer un profil</h4>
        <p>Quel profil changer ?</p>
        <select onChange={(ev) => handleChangeprofilID(ev)} name="profils">
          <option>Choissisez un profil</option>
          {profils.map((profil, index) => {
            return (
              <option value={`${Number(index + 1)},${profil.id}`}>
                {profil.prenom + " " + profil.nom}
              </option>
            );
          })}
        </select>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="prenom">
            Prénom
          </label>
          <Input
            type={"text"}
            name={"prenom"}
            placeholder="prenom"
            value={prenom}
            onChange={(ev) => setPrenom(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="nom">
            Nom
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
          <label htmlFor="bac" className={styles.label}>
            Bac
          </label>
          <select className={styles.select} name="bac" onChange={(ev) => setBac(ev.target.value)}>
            <option value={bac}>{bac}</option>
            <option value="S">S</option>
            <option value="ES">ES</option>
            <option value="L">L</option>
            <option value="Technologique">Technologique</option>
            <option value="Pro">Pro</option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="promo">
            Année de début de la promo
          </label>
          <input type="number" value={promo} onChange={(ev) => setPromo(Number(ev.target.value))} />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="metier">
            Metier / role(pour professeur)
          </label>
          <Input
            type={"text"}
            name={"metier"}
            placeholder="metier"
            value={metier}
            onChange={(ev) => setMetier(ev.target.value)}
          />
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
        <div className={styles.inputContainer}>
          <label htmlFor="conseil" className={styles.label}>
            Conseil
          </label>
          <Textarea
            name={"conseil"}
            placeholder="conseil"
            value={conseil}
            onChange={(ev) => setConseil(ev.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="activ" className={styles.label}>
            Compte activé
          </label>

          <input type="checkbox" checked={active} onClick={() => setActive(!active)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="etudiant" className={styles.label}>
            Est étudiant ?
          </label>
          <input type="checkbox" checked={etudiant} onClick={() => setEtudiant(!etudiant)} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="admin" className={styles.label}>
            Est adminstrateur ?
          </label>
          <input type="checkbox" checked={admin} onClick={() => setAdmin(!admin)} />
        </div>
        <p>{message}</p>
        <button className={`${styles.button} ${styles.buttonModif}`} onClick={() => modifyProfil()}>
          Apporter les modification au profil de {prenom} {nom}
        </button>
        <button
          className={`${styles.button} ${styles.buttonDelete}`}
          onClick={() => deleteProfil()}
        >
          Supprimez le profil de {prenom} {nom}
        </button>
      </div>
    </Layout>
  );
}

export default adminProfils;

export async function getServerSideProps(ctx: NextPageContext) {
  const profils = await myGetAdmin(`${process.env.adress}api/adminAPI/getProfil`, ctx);

  return {
    props: {
      profils,
    },
  };
}
