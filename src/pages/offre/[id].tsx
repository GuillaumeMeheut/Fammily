import Layout from "../../components/Layout/Layout";
import styles from "./offre.module.scss";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Offre({ offre }) {
  const returnCard = () => {
    if (offre.entreprise)
      return (
        <div className={styles.containerEntreprise}>
          <h4 className={styles.entrepriseTitre}>{offre.entreprise.nom}</h4>
          <p>{offre.entreprise.ville}</p>
          <p>{offre.entreprise.departement}</p>
          <p>SIREN: {offre.entreprise.siren}</p>
          <p>
            <strong>Contact</strong> :
          </p>
          <p>
            <strong>Mail</strong> : {offre.entreprise.mail}
          </p>
          <p>
            <strong>Tel</strong> : {offre.entreprise.tel}
          </p>
        </div>
      );
  };

  return (
    <Layout title={offre.titre}>
      <section className={styles.containerAll}>
        <h3 className={styles.offreTitre}>
          {offre.titre} {offre.entreprise ? "-" + offre.entreprise.nom : ""}
        </h3>
        <div className={styles.wrap}>
          <div className={styles.containerOffre}>
            <p className={styles.offreLocalisation}>LOCALISATION : {offre.lieu}</p>
            <p className={styles.offreTitreDesc}>DESCRIPTION DU POSTE</p>
            <p className={styles.offreDesc}>{offre.description}</p>
          </div>
        </div>
        {returnCard()}
      </section>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const offre = await prisma.offre.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      entreprise: true,
    },
  });

  return {
    props: {
      offre,
    },
  };
};
