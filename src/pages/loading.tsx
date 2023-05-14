import styles from "@/styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <h1>Connexion...</h1>
      <br/>
      <p>En attente de connexion au serveur</p>
    </div>
  );
}
