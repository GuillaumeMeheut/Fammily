import Button from "../components/button";
import styles from "./index.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bienvenue</h2>
      <img className={styles.img} src="/assets/welcome1.png" alt="" />
      <Button text={"SE CONNECTER"} href={"/login"} backColor={"white"} />
      <Button text={`S'INSCRIRE`} href={"/signup"} backColor={"pink"} />
    </div>
  );
}
