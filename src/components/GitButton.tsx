import styles from "@/styles/GitButton.module.css";
import { useRouter } from "next/router";

/* Boutton qui renvoie vers le site de CPE */
export function GitButton () {

    async function handleClick() {
        window.open("https://github.com/cpe-lyon/inge-web-projet-booty-byte-er");
    }
    
    return (
        <div className={styles.all}>
            <button onClick={handleClick}>
                <img className={styles.logo} src="icons/gitlogo.jpg" />
            </button>
        </div>
    )
}
