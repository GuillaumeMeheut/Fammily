import Layout from "../../../components/Layout/Layout";
import styles from "./etudiant.module.scss";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Etudiant({ etu }) {
  return (
    <Layout title={etu.nom + " " + etu.prenom}>
      <div className={styles.containerAll}>
        <div className={styles.topContainer}>
          <img
            className={styles.image}
            src={etu.image ? etu.image : "/assets/profil/noImage.png"}
            alt={"photo de profil de" + etu.prenom + etu.nom}
          />
          <div className={styles.containerText}>
            <p>{`${etu.prenom} ${etu.nom} (Bac ${etu.bac})`}</p>
            <p>{etu.promo === 0 ? "" : "Promo " + etu.promo + "-" + (etu.promo + 2)}</p>
            <p className={styles.metier}>
              {etu.metier === "" ? "Aucun métier défini" : etu.metier}
            </p>
            <p className={styles.desc}>{etu.description}</p>
          </div>
        </div>

        <div className={styles.conseilContainer}>
          <h3 className={styles.conseilTitle}>Conseil</h3>
          <p className={styles.conseil}>{etu.conseil}</p>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const etu = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return {
    props: {
      etu,
    },
  };
};
