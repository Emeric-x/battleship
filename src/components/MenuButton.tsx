import styles from "@/styles/MenuButton.module.css";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

/* Boutton qui renvoie vers la page d'accueil */
export function MenuButton () {

    const router = useRouter();
    const [, , removeCookie] = useCookies(["access_token"]);

    function handleClick() {
        removeCookie("access_token"); // Supprime le cookie pour ne pas être ramené vers /preparation
        router.push("/"); // Redirige vers la page d'accueil
    }


    return (
        <div className={styles.all}>
            <button onClick={handleClick}>
                <img className={styles.logo} src="icons/houselogo.png" />
            </button>
        </div>
    )
}
