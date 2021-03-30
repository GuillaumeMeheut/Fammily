import Layout from "../components/Layout/Layout";
import Link from "next/link";
import styles from "./equipePedagogique.module.scss";
import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";

function EquipePedagogique({ equipes }) {
  return (
    <Layout title={"Équipe pédagogique"}>
      <div className={styles.cardsContainer}>
        {equipes.map((membre) => {
          return (
            <Link key={membre.id} href={`/profil/prof/${membre.id}`}>
              <div className={styles.card}>
                <img src={membre.image ? membre.image : "/assets/profil/noImage.png"} alt="" />
                <div className={styles.textContainer}>
                  <p>
                    <span className={styles.caption}>NOM : </span>
                    {membre.prenom} {membre.nom}
                  </p>
                  <p>
                    <span className={styles.caption}>RÔLE : </span>
                    {membre.metier === "Null" ? "Non défini" : membre.metier}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export default EquipePedagogique;

export async function getServerSideProps(ctx: NextPageContext) {
  const equipes = await myGet(`${process.env.adress}api/equipePedagogique`, ctx);

  return {
    props: {
      equipes,
    },
  };
}
