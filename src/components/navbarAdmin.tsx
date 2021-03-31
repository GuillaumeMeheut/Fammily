import Link from "next/link";
import styles from "./navbarAdmin.module.scss";

function navbarAdmin() {
  return (
    <nav className={styles.nav}>
      <Link href={`/adminInterface/actualites`}>
        <a>Modifiez les actus</a>
      </Link>
      <Link href={`/adminInterface/profils`}>
        <a>Modifier les profils</a>
      </Link>
      <Link href={`/adminInterface/confirmProfil`}>
        <a>Voir tout les profils à confirmer</a>
      </Link>
      <Link href={`/adminInterface/entreprises`}>
        <a>Modifier les entreprises</a>
      </Link>
      <Link href={`/adminInterface/emplois`}>
        <a>Modifier les emplois</a>
      </Link>
    </nav>
  );
}

export default navbarAdmin;
