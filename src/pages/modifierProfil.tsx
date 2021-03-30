import { useState } from "react";
import styles from "./modifierProfil.module.scss";
import Input from "../components/input";
import { NextPageContext } from "next";
import Textarea from "../components/textarea";
import Layout from "../components/Layout/Layout";
import { myGet } from "../../api/myGet";

function modifierProfil({ user }) {
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [promo, setPromo] = useState(user.promo);
  const [domaine, setDomaine] = useState(user.domaine);
  const [bac, setBac] = useState(user.bac);
  const [metier, setMetier] = useState(user.metier);
  const [photo, setPhoto] = useState(user.image);
  const [photoInput, setPhotoInput] = useState(user.image);
  const [description, setDescription] = useState(user.description);
  const [conseil, setConseil] = useState(user.conseil);

  const [message, setMessage] = useState("");

  const modify = async () => {
    const rawResponse = await fetch(`/api/modifierMonProfil`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        prenom,
        promo,
        domaine,
        bac,
        metier,
        photo,
        description,
        conseil,
      }),
    });
    const content = await rawResponse.json();
    setMessage(content.message);
  };

  const handleSubmit = (event) => {
    modify();
    event.preventDefault();
  };

  const handleChangeArticleImage = async (evt) => {
    let file = evt.target.files[0];

    if (file.size > 1048576) {
      setMessage("Image trop lourde");
    } else {
      const readURL = (file) => {
        return new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = (e) => res(e.target.result);
          reader.onerror = (e) => rej(e);
          reader.readAsDataURL(file);
        });
      };
      let url: any = await readURL(file);
      setPhotoInput(url);
      url = url.split(",")[1];
      setPhoto(url);
    }
  };
  return (
    <Layout>
      <div className={styles.containerAll}>
        <div className={styles.wrap}>
          <div>
            <div className={styles.inputContainer}>
              <label htmlFor="nom" className={styles.label}>
                Nom
              </label>
              <Input
                type={"nom"}
                name={"nom"}
                placeholder={"NOM"}
                value={nom}
                onChange={(ev) => setNom(ev.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="prenom" className={styles.label}>
                Prénom
              </label>
              <Input
                type={"prenom"}
                name={"prenom"}
                placeholder={"PRENOM"}
                value={prenom}
                onChange={(ev) => setPrenom(ev.target.value)}
              />
            </div>
            {user.etudiant && (
              <div className={styles.inputContainer}>
                <label htmlFor="promo" className={styles.label}>
                  Promo
                </label>
                <Input
                  type={"promo"}
                  name={"promo"}
                  placeholder={"PROMO"}
                  value={promo}
                  onChange={(ev) => setPromo(Number(ev.target.value))}
                />
              </div>
            )}
          </div>
          <div>
            {user.etudiant && (
              <div className={styles.inputContainer}>
                <label htmlFor="domaine" className={styles.label}>
                  Domaine
                </label>
                <select
                  className={styles.select}
                  name="domaine"
                  onChange={(ev) => setDomaine(ev.target.value)}
                >
                  <option value={user.domaine}>{user.domaine}</option>
                  <option value="Generaliste">Généraliste</option>
                  <option value="Graphisme">Graphisme</option>
                  <option value="Developpement">Développement</option>
                  <option value="Communication">Communication</option>
                  <option value="Audiovisuel">Audiovisuel</option>
                  <option value="Photographie">Photographie</option>
                  <option value="Autres">Autres</option>
                </select>
              </div>
            )}
            {user.etudiant && (
              <div className={styles.inputContainer}>
                <label htmlFor="domaine" className={styles.label}>
                  Bac
                </label>
                <select
                  className={styles.select}
                  name="bac"
                  onChange={(ev) => setBac(ev.target.value)}
                >
                  <option value={user.bac}>{user.bac}</option>
                  <option value="S">S</option>
                  <option value="ES">ES</option>
                  <option value="L">L</option>
                  <option value="Technologique">Technologique</option>
                  <option value="Pro">Pro</option>
                </select>
              </div>
            )}
            <div className={styles.inputContainer}>
              <label htmlFor="metier" className={styles.label}>
                {user.etudiant ? "Métier" : "Fonction au sein de l'iut"}
              </label>
              <Input
                type={"metier"}
                name={"metier"}
                placeholder={"METIER"}
                value={metier}
                onChange={(ev) => setMetier(ev.target.value)}
              />
            </div>
          </div>
          <label
            style={{
              backgroundImage:
                "url(" + `${photoInput ? photoInput : "/assets/profil/noImage.png"}` + ")",
            }}
            htmlFor="photo"
            className={styles.labelPhoto}
          ></label>
          <input
            id="photo"
            className={styles.inputPhoto}
            type="file"
            accept="image/*"
            onChange={(ev) => handleChangeArticleImage(ev)}
          />
        </div>
        <div className={styles.containerTextArea}>
          <div className={styles.textarea}>
            <label htmlFor="metier" className={styles.label}>
              Description
            </label>
            <Textarea
              name={"description"}
              placeholder={"DESCRIPTION"}
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
          {user.etudiant && (
            <div className={styles.textarea}>
              <label htmlFor="metier" className={styles.label}>
                Conseil
              </label>
              <Textarea
                name={"conseil"}
                placeholder={"CONSEIL"}
                value={conseil}
                onChange={(ev) => setConseil(ev.target.value)}
              />
            </div>
          )}
        </div>
        <p className={styles.statusMessage}>{message}</p>
        <button className={styles.buttonSubmit} onClick={(ev) => handleSubmit(ev)}>
          ENREGISTRER MES INFORMATIONS
        </button>
      </div>
    </Layout>
  );
}

export default modifierProfil;

export async function getServerSideProps(ctx: NextPageContext) {
  const user = await myGet(`${process.env.adress}api/getProfil`, ctx);

  return {
    props: {
      user,
    },
  };
}
