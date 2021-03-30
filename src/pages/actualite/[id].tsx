import Layout from "../../components/Layout/Layout";
import { PrismaClient } from "@prisma/client";
import styles from "./actu.module.scss";
const prisma = new PrismaClient();

export default function Actualite({ actualite }) {
  return (
    <Layout>
      <article className={styles.container}>
        <img className={styles.img} src={`/assets/actualite/imgActu${actualite.id}.png`} alt="" />
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{actualite.titre}</h2>
          <p>{actualite.texte}</p>
        </div>
      </article>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const actualites = await prisma.actualite.findMany();

//   // Get the paths we want to pre-render based on posts
//   const paths = actualites.map((actualite) => ({
//     params: { id: actualite.id.toString() },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

export const getServerSideProps = async ({ params }) => {
  const actualite = await prisma.actualite.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return {
    props: {
      actualite,
    },
  };
};
