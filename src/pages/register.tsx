import Head from "next/head";
import styles from "@/styles/Register.module.css";
import { Userservice } from "@/core/user.service";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { MenuButton } from '@/components/MenuButton';

export default function Register() {
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

  const [Confirmpassword, setConfirmPassword] = useState("");
  function handleConfirmPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setConfirmPassword(value);
  }

  //Pour activer le bouton "Register" en tappant sur la touche "Entrée"
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      document.getElementById("RegisterButton")?.click(); //active le bouton "Register"
    }
  };

  async function handleClick() {
    try {
      if (password === Confirmpassword) {
        let res = await Userservice.register(username, password);
        if (res !== null) {
          Userservice.StoreJWT(res[0].token.access_token);
          router.push("/findgame");
          setError("");
        } else {
          setError("Mot de passe ou login incorrect");
        }
      } else {
        setError("Mots de passe différents");
      }
    } catch (e) {
      setError(e as string);
    }
  }

  return (
    <div className={styles.all}>
      <Head>
        <title>BATTLESHIP - BootyByters</title>
        <link rel="icon" href="/steeringwheel2.ico" />
      </Head>      
      <main className={styles.box}>
        <MenuButton />
        <div className={styles.registerbox}>
          <p className={styles.p1}>BATAILLE &nbsp;NAVALE</p>
          <p className={styles.p2}>BY THE</p>
          <p className={styles.p3}>B O O T Y &nbsp;&nbsp; B Y T E R S</p>
          <br />
          <h1 className={styles.titleRegister}>S'inscrire</h1>
          <div className={styles.formRegister}>
            <div className={styles.wrapperbox}>
              <label className={styles.icon1}>
                <i className={styles.iconUser}>
                  <img className={styles.image} src="icons/user.png" />
                </i>
              </label>
              <input
                className={styles.inputT1}
                type="username"
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
                  <img
                    className={styles.image}
                    src="icons/cadenas-verrouille.png"
                  />
                </i>
              </label>
              <input
                className={styles.inputT2}
                type="password"
                name="name"
                id="name"
                placeholder="Mot de passe"
                required
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
              />
              <br />
              <label className={styles.icon3}>
                <i className={styles.iconCadenas}>
                  <img
                    className={styles.image}
                    src="icons/cadenas-verrouille.png"
                  />
                </i>
              </label>
              <input
                className={styles.inputT3}
                type="password"
                name="name"
                id="name"
                placeholder="Confirmer mot de passe"
                required
                value={Confirmpassword}
                onChange={handleConfirmPasswordChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <p className={styles.pError}>{error}</p>
            <button id="RegisterButton" className={styles.registerButton} onClick={handleClick}>
              Je m'inscris
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
