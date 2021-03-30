import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./Navbar.module.scss";

function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  return (
    <nav className={styles.nav}>
      <img
        onClick={() => setOpenMobile(!openMobile)}
        className={styles.menuImg}
        src="/assets/menu.png"
        alt=""
      />
      <Link href={`/accueil`}>
        <img className={styles.logo} src="/assets/logommi.png" alt="logommi" />
      </Link>

      <div
        className={
          openMobile
            ? `${styles.linkContainer} ${styles.linkContainerActive}`
            : styles.linkContainer
        }
      >
        <img onClick={() => setOpenMobile(!openMobile)} src="/assets/cross.png" alt="cross" />

        <Link href={`/accueil`}>
          <a className={router.pathname == "/accueil" ? styles.active : ""}>Accueil</a>
        </Link>
        <Link href={`/apropos`}>
          <a className={router.pathname == "/apropos" ? styles.active : ""}>A propos de MMI</a>
        </Link>
        <Link href={`/etudiant`}>
          <a className={router.pathname == "/etudiant" ? styles.active : ""}>Etudiants</a>
        </Link>
        <Link href={`/offreEmploi`}>
          <a className={router.pathname == "/offreEmploi" ? styles.active : ""}>Offre d'emploi</a>
        </Link>
        <Link href={`/equipePedagogique`}>
          <a className={router.pathname == "/equipePedagogique" ? styles.active : ""}>
            Equipe pédagogique
          </a>
        </Link>
      </div>

      <div onClick={() => setOpen(!open)} className={styles.containerImg}>
        <img src="/assets/login.png" alt="login" />
        <span className={styles.background}></span>
      </div>

      <div className={open ? `${styles.rightMenu} ${styles.rightMenuActive}` : styles.rightMenu}>
        <img onClick={() => setOpen(!open)} src="/assets/cross.png" alt="cross" />
        <Link href={`/modifierProfil`}>
          <a className={styles.button}>MODIFIER MES INFORMATIONS</a>
        </Link>
        <a
          onClick={() => {
            fetch(`/api/deconnexion`);
            router.push("/login");
          }}
          className={styles.button}
        >
          DÉCONNEXION
        </a>
        <Link href={`/adminInterface/actualites`}>
          <a className={`${styles.button} ${styles.buttonAdmin}`}>Admin</a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
