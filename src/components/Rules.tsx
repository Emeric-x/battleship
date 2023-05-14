import styles from "@/styles/Rules.module.css";

export function Rules() {

    return (

        <div className={styles.div1}> 
            <h1 className={styles.rulesTitle}>Consignes :</h1>
            <div className={styles.rulesDiv}>
              - Déplacez vos navires sur la grille <br/>
              - Cliquez sur un navire pour le faire pivoter <br/>
              - Soyez sûr des vos placements avant de valider
            </div>
        </div>

    )
}