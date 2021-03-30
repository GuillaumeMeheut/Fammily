import Link from "next/link";
import styles from "./button.module.scss";

function Button({href, text, backColor}) {
  let styleColor;

  if(backColor === "white") styleColor = `${styles.button} ${styles.backgroundWhite}`;
  else styleColor = `${styles.button} ${styles.backgroundPink}`;
  
    return (
      <Link href={href}>
        <button className={styleColor}>
          <a>{text}</a>
        </button>
      </Link>
    );
  }
  
  export default Button;