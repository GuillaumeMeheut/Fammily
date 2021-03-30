import { useState } from "react";
import styles from "./signup.module.scss";
import stylesButton from "../components/button.module.scss";
import Input from "../components/input";

//https://github.com/erenesto/interactive-password-validator

function SignUp() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState("");
  const [incorrectClass, setIncorrectClass] = useState(styles.invalid);

  const signup = async (nom, prenom, email, password) => {
    const rawResponse = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom: nom, prenom: prenom, email: email, password: password }),
    });
    const content = await rawResponse.json();
    setIncorrect(content.message);
    setIncorrectClass(styles.valid);
  };

  const handleSubmit = (event) => {
    if (!validNomPrenom(nom, prenom)) {
      setIncorrect("Le prénom ou le nom contient des caractères spéciaux");
      setIncorrectClass(styles.invalid);
    } else if (!validEmail(email)) {
      setIncorrect("Adresse mail non valide");
      setIncorrectClass(styles.invalid);
    } else if (!validPassword(password)) {
      setIncorrect("Votre mot de passe doit posséder minimum 8 caractères et une majuscule");
      setIncorrectClass(styles.invalid);
    } else {
      signup(nom, prenom, email, password);
    }

    event.preventDefault();
  };

  const validEmail = (email) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      return true;
    else return false;
  };

  const validNomPrenom = (nom, prenom) => {
    const letters = /^[A-Za-z]+$/;
    if (nom.match(letters) && prenom.match(letters)) return true;
    else return false;
  };

  const validPassword = (password) => {
    if (password.length >= 8 && password.match(/[A-Z]/g)) return true;
  };
  return (
    <div className={styles.container}>
      <h2>Inscription</h2>
      <p className={`${styles.incorrect} ${incorrectClass}`}>{incorrect}</p>
      <form className={styles.form} onSubmit={(ev) => handleSubmit(ev)}>
        <Input
          type={"text"}
          name={"nom"}
          placeholder={"NOM"}
          value={nom}
          onChange={(ev) => setNom(ev.target.value)}
        />
        <Input
          type={"text"}
          name={"prenom"}
          placeholder={"PRENOM"}
          value={prenom}
          onChange={(ev) => setPrenom(ev.target.value)}
        />
        <Input
          type={"text"}
          name={"email"}
          placeholder={"EMAIL"}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Input
          type={"password"}
          name={"password"}
          placeholder={"MOT DE PASSE"}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <input
          className={`${styles.button} ${stylesButton.button} ${stylesButton.backgroundPink}`}
          type="submit"
          value="Envoyer mes informations"
        />
      </form>
    </div>
  );
}

export default SignUp;
