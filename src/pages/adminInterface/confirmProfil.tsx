import { NextPageContext } from "next";
import { useState } from "react";
import { myGetAdmin } from "../../../api/myGetAdmin";
import styles from "./admin.module.scss";
import Navbar from "../../components/navbarAdmin";
import Layout from "./../../components/Layout/Layout";

function adminProfils({ profils }) {
  const [message, setMessage] = useState("");

  const validProfil = async (id) => {
    const rawResponse = await fetch(`/api/adminAPI/validProfil`, {
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
  const deleteProfil = async (id) => {
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

  return (
    <Layout>
      <div>
        <Navbar />
        <h4>Tout les profils non validés</h4>
        {profils.map((profil) => {
          return (
            <div className={styles.containerValid}>
              <div>
                <p>Prenom : {profil.prenom}</p>
                <p>Nom : {profil.nom}</p>
              </div>
              <button
                className={`${styles.buttonSmall} ${styles.buttonModif}`}
                onClick={() => validProfil(profil.id)}
              >
                Valider
              </button>
              <button
                className={`${styles.buttonSmall} ${styles.buttonDelete}`}
                onClick={() => deleteProfil(profil.id)}
              >
                Supprimer
              </button>
            </div>
          );
        })}

        <p>{message}</p>
      </div>
    </Layout>
  );
}

export default adminProfils;

export async function getServerSideProps(ctx: NextPageContext) {
  const profils = await myGetAdmin(`${process.env.adress}api/adminAPI/getProfilNoValid`, ctx);

  return {
    props: {
      profils,
    },
  };
}
