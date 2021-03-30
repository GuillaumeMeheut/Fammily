import Layout from "../components/Layout/Layout";
import styles from "./apropos.module.scss";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

export default function Apropos({ dataEtudiant }) {
  const [activeButton, setActiveButton] = useState(true);

  const renderText = () => {
    if (activeButton)
      return (
        <p className={styles.texte}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      );
    else
      return (
        <p className={styles.texte}>
          L’objectif du B.U.T. MMI est de former des techniciens supérieurs polyvalents (bac+3) en
          Métiers du Multimédia et de l’Internet. Ce diplôme est construit sur une approche par
          compétences. Grâce à ce processus d’apprentissage, l’étudiant sera formé à la fois par une
          pédagogie par projets, des mises en situation professionnelle pour l’aider à cerner la
          diversité des métiers, et par un ensemble de cours magistraux, travaux dirigés et travaux
          pratiques pour lui offrir les supports théoriques et pratiques indispensables à son
          épanouissement futur. A la fin des trois années, ces techniciens supérieurs polyvalents,
          autrement appelés “couteaux suisses” seront en mesure d’intervenir dans : <br />
          <br />- la mise en place d’un plan de communication en relation avec les besoins du client{" "}
          <br />- la réalisation des produits et supports de communication écrits, visuels,
          audiovisuels, numériques <br />- le développement d’applications multimédia et mobiles{" "}
          <br />- la programmation et le design de site web
        </p>
      );
  };

  let dataB = [];

  const s = dataEtudiant.filter((etu) => etu.bac === "S");
  const es = dataEtudiant.filter((etu) => etu.bac === "ES");
  const l = dataEtudiant.filter((etu) => etu.bac === "L");
  const tec = dataEtudiant.filter((etu) => etu.bac === "Technologique");
  const pro = dataEtudiant.filter((etu) => etu.bac === "Pro");

  dataB.push(s.length, es.length, l.length, tec.length, pro.length);

  const dataBac = {
    labels: ["S", "ES", "L", "Technologique", "Pro"],
    datasets: [
      {
        data: dataB,
        backgroundColor: ["#F08E66", "#AF1E06", "#F52EA4", "#8B7166", "#36A2EB"],
      },
    ],
  };

  let dataDom = [];

  const gen = dataEtudiant.filter((etu) => etu.domaine === "Generaliste");
  const gra = dataEtudiant.filter((etu) => etu.domaine === "Graphisme");
  const dev = dataEtudiant.filter((etu) => etu.domaine === "Developpement");
  const com = dataEtudiant.filter((etu) => etu.domaine === "Communication");
  const aud = dataEtudiant.filter((etu) => etu.domaine === "Audiovisuel");
  const aut = dataEtudiant.filter((etu) => etu.domaine === "Autres");

  dataDom.push(gen.length, gra.length, dev.length, com.length, aud.length, aut.length);

  const dataDomaine = {
    labels: ["Généraliste", "Graphisme", "Développement", "Communication", "Audiovisuel", "Autres"],
    datasets: [
      {
        data: dataDom,
        backgroundColor: ["#F08E66", "#AF1E06", "#F52EA4", "#8B7166", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  {
  }
  return (
    <Layout title={"À propos"}>
      <section className={styles.section}>
        <img className={styles.img} src="/assets/aproposImg.png" alt="" />
        <div className={styles.buttonTextContainer}>
          <div>
            <button
              onClick={() => setActiveButton(true)}
              className={activeButton ? styles.activeButton : ""}
            >
              DUT
            </button>
            <button
              onClick={() => setActiveButton(false)}
              className={activeButton ? "" : styles.activeButton}
            >
              BUT
            </button>
          </div>
          {renderText()}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.allDataContainer}>
          <div className={styles.dataContainer}>
            <p className={styles.dataTitle}>Bac d'origine</p>
            <div className={styles.data}>
              <Pie data={dataBac} />
            </div>
          </div>
          <div className={styles.dataContainer}>
            <p className={styles.dataTitle}>Domaine d’insertion professionnelle</p>
            <div className={styles.data}>
              <Pie data={dataDomaine} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const resp = await fetch(`${process.env.adress}api/dataEtudiant`);

  const dataEtudiant = await resp.json();

  return {
    props: {
      dataEtudiant,
    },
  };
};
