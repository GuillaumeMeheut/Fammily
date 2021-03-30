import Layout from "../components/Layout/Layout";
import styles from "./offreEmploi.module.scss";
import Link from "next/link";
import { myGet } from "../../api/myGet";
import { NextPageContext } from "next";

export default function Offres({ offres }) {
  return (
    <Layout title="Offre d'emploi">
      <div className={styles.cardsContainer}>
        {offres.map((offre) => {
          return (
            <Link key={offre.id} href={`/offre/${offre.id}`}>
              <div className={styles.card}>
                <div className={styles.wrap}>
                  <p>
                    {offre.titre}, {offre.domaine}
                  </p>
                  <p>
                    {offre.lieu} {offre.entreprise ? "," + offre.entreprise.nom : ""}
                  </p>
                  <p>Description:</p>
                </div>
                <p className={styles.desc}>{offre.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const offres = await myGet(`${process.env.adress}api/offreEmploi`, ctx);

  return {
    props: {
      offres,
    },
  };
}
