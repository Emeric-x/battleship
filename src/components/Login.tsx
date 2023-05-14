import styles from "@/styles/Login.module.css";
import Link from "next/link";
import { Userservice } from "@/core/user.service";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

export function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setUsername(value);
  }

  const [password, setPassword] = useState("");
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
  }

  //Pour activer le bouton "JOUER" en tappant sur la touche "Entrée"
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      document.getElementById("myButton")?.click(); //active le bouton "JOUER"
    }
  };
  

  async function handleClick() {
    try {
      let res = await Userservice.login(username, password);
      if (res !== null) {
        Userservice.StoreJWT(res[0].token.access_token);
        router.push("/findgame");
        setError("");
      } else {
        setError("Mot de passe ou login incorrect");
      }
    } catch (e) {
      setError(e as string);
    }
  }
  

  return (
    <div className={styles.loginlines}>
      <h1 className={styles.titleLogin}>Connexion</h1>
      <div className={styles.wrapperbox}>
        <label className={styles.icon1}>
          <i className={styles.iconUser}>
            <img className={styles.image} src="icons/user.png" />
          </i>
        </label>
        <input
          className={styles.inputT1}
          type="text"
          name="name"
          id="name"
          placeholder="Pseudo"
          required
          value={username}
          onChange={handleUsernameChange}
          onKeyPress={handleKeyPress}
        />
        <br />
        <label className={styles.icon2}>
          <i className={styles.iconCadenas}>
            <img className={styles.image} src="icons/cadenas-verrouille.png" />
          </i>
        </label>
        <input
          className={styles.inputT2}
          type="password"
          name="pwd"
          id="pwd"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
        />
      </div>
        <p className={styles.pError}>{error}</p>
        <button id="myButton" className={styles.loginButton} onClick={handleClick}>
          JOUER
        </button>
        <br/>
        <p className={styles.smalltext}>Pas de compte ?</p>
        <Link href="/register" className={styles.registerButton}>
          Inscris-toi
        </Link>
    </div>
  );
}
