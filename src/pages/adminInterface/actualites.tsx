import { NextPageContext } from "next";
import { useState } from "react";
import { myGetAdmin } from "../../../api/myGetAdmin";
import styles from "./admin.module.scss";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Navbar from "../../components/navbarAdmin";
import Layout from "./../../components/Layout/Layout";

function adminActualites({ actualites }) {
  const [articleID, setArticleID] = useState(0);
  const [titre, setTitre] = useState("");
  const [texte, setTexte] = useState("");
  const [imageActu, setImageActu] = useState("");
  const [messageActu, setMessageActu] = useState("");

  const modifyActu = async (titre, texte, id, image) => {
    const rawResponse = await fetch(`/api/adminAPI/modifyActualite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titre, texte, id, image }),
    });
    const content = await rawResponse.json();
    setMessageActu(content.message);
  };

  const handleChangeArticleID = (event) => {
    setArticleID(event.target.value);
    setTitre(actualites[event.target.value - 1].titre);
    setTexte(actualites[event.target.value - 1].texte);
  };
  const handleChangeArticleTitre = (event) => {
    setTitre(event.target.value);
  };
  const handleChangeArticleTexte = (event) => {
    setTexte(event.target.value);
  };

  const handleChangeArticleImage = async (evt) => {
    let file = evt.target.files[0];

    if (file.size > 1048576) {
      setMessageActu("Image trop lourde");
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
      url = url.split(",")[1];
      setImageActu(url);
    }
  };

  const handleSubmit = (event) => {
    modifyActu(titre, texte, articleID, imageActu);
    event.preventDefault();
  };
  return (
    <Layout>
      <div>
        <Navbar />
        <h4>Changer les actualités</h4>
        <div>
          <p>Quel actualite changer ?</p>
          <select onChange={(ev) => handleChangeArticleID(ev)} name="actualites">
            <option>Choissisez votre article</option>
            {actualites.map((actu, index) => {
              return <option value={Number(index + 1)}>{actu.titre}</option>;
            })}
          </select>

          <label htmlFor="titre">Titre</label>
          <Input
            type={"text"}
            name={"titre"}
            placeholder="titre"
            value={titre}
            onChange={(ev) => handleChangeArticleTitre(ev)}
          />

          <Textarea
            name={"texte"}
            placeholder="texte"
            value={texte}
            onChange={(ev) => handleChangeArticleTexte(ev)}
          />

          <div>
            <p>Image actuelle</p>
            <img src={`/assets/actualite/imgActu${articleID}.png`} alt={`imgActu${articleID}`} />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(ev) => handleChangeArticleImage(ev)}
          ></input>

          <p>{messageActu}</p>
          <button
            className={`${styles.button} ${styles.buttonModif}`}
            onClick={(ev) => handleSubmit(ev)}
          >
            Modifier l'actualite {articleID}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default adminActualites;

export async function getServerSideProps(ctx: NextPageContext) {
  const actualites = await myGetAdmin(`${process.env.adress}api/adminAPI/getActualite`, ctx);

  return {
    props: {
      actualites,
    },
  };
}
