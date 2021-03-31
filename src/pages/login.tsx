import { useRouter } from "next/router";
import { useState } from "react";
import Input from "../components/input";
import Button from "../components/button";
import stylesButton from "../components/button.module.scss";
import styles from "./login.module.scss";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState("");

  const login = async (email, password) => {
    const rawResponse = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const content = await rawResponse.json();
    console.log(content.message);
    if (content.message === "Email ou mot de passe incorrect") setIncorrect(content.message);
    else router.push("/accueil");
  };

  const handleChange = (event) => {
    if (event.target.attributes.name.value === "email") setEmail(event.target.value);
    else setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    //need to check si les input sont remplies
    login(email, password);
    event.preventDefault();
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>Connexion</h2>
        <p className={styles.incorrect}>{incorrect}</p>
      </div>
      <div className={styles.containerInput}>
        <Input
          type={"text"}
          name={"email"}
          placeholder={"EMAIL"}
          value={email}
          onChange={(ev) => handleChange(ev)}
        />

        <Input
          type={"password"}
          name={"password"}
          placeholder={"MOT DE PASSE"}
          value={password}
          onChange={(ev) => handleChange(ev)}
        />
      </div>
      <div className={styles.containerButton}>
        <button
          className={`${stylesButton.button} ${stylesButton.backgroundPink}`}
          onClick={(ev) => handleSubmit(ev)}
        >
          Connexion
        </button>

        <Button href={"/signup"} text={"S'INSCRIRE"} backColor={"white"} />
      </div>
    </div>
  );
}

export default Login;
