import Head from "next/head";
import styles from "./Layout.module.scss";
import Navbar from "./Navbar";

const Layout = ({ children, title = "Annuaire Unilim" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>{/* copyright */}</footer>
    </div>
  );
};

export default Layout;
