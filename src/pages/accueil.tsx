import Layout from "../components/Layout/Layout";
import styles from "./accueil.module.scss";
import Link from "next/link";
import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";

export default function Accueil({ actualites }) {
  return (
    <Layout>
      <section className={styles.allContainer}>
        <div className={styles.firstContainer}>
          <img src="/assets/worker.png" alt="" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
        <div className={styles.articlesContainer}>
          {actualites.map((actualite) => {
            return (
              <div className={styles.card} key={actualite.id}>
                <img
                  className={styles.img}
                  src={`/assets/actualite/imgActu${actualite.id}.png`}
                  alt={actualite.titre}
                />
                <div className={styles.containerText}>
                  <h2 className={styles.title}>{actualite.titre}</h2>
                  <p className={styles.texte}>{actualite.texte}</p>
                  <Link href={`/actualite/${actualite.id}`}>
                    <div className={styles.button}>
                      <a>LIRE PLUS</a>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const actualites = await myGet(`${process.env.adress}api/actualite`, ctx);

  return {
    props: {
      actualites,
    },
  };
};
