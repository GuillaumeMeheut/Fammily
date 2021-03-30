import Layout from "../../../components/Layout/Layout";
import styles from "./prof.module.scss";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Prof({ prof }) {
  return (
    <Layout title={prof.nom + " " + prof.prenom}>
      <div className={styles.containerAll}>
        <img
          className={styles.image}
          src={prof.image ? prof.image : "/assets/profil/noImage.png"}
          alt={prof.nom + " " + prof.prenom}
        />
        <div className={styles.containerText}>
          <h3>{prof.nom + " " + prof.prenom}</h3>
          <p>
            <span>RÔLE : </span>
            {prof.metier}
          </p>
          <p>
            <span>DESCRIPTION : </span>
            <br />
            <br />
            {prof.description}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const prof = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return {
    props: {
      prof,
    },
  };
};
