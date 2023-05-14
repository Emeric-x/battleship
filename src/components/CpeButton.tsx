import styles from "@/styles/CpeButton.module.css";
import { useRouter } from "next/router";

/* Boutton qui renvoie vers le site de CPE */
export function CpeButton () {

    async function handleClick() {
        window.open("https://www.cpe.fr/");
    }
    
    return (
        <div className={styles.all}>
            <button onClick={handleClick}>
                <img className={styles.logo} src="icons/cpelogo.jpg" />
            </button>
        </div>
    )
}
