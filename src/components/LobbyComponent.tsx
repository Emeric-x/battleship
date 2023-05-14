import { useState, useEffect } from "react";
import { Userservice } from "@/core/user.service";
import styles from "@/styles/LobbyComponent.module.css";
import { GameRoomService } from "@/core/gameroom.service";

export function LobbyComponent({roomDatas}: any) {
  const [opponentName, setOpponentName] = useState("");
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [opponentReady, setOpponentReady] = useState(false);
  const [currentPlayerReady, setCurrentPlayerReady] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (roomDatas !== null && roomDatas !== undefined) {
        GameRoomService.getGameDatas(roomDatas.id).then((response) => {
          if (response !== null) {
            setOpponentReady(
              response.player1_id === Userservice.parseJwt().id
                ? response.player2_ready
                : response.player1_ready
            );
            setCurrentPlayerReady(
              response.player1_id === Userservice.parseJwt().id
              ? response.player1_ready
              : response.player2_ready
            );
            const { player1_id } = response;
            if (player1_id === Userservice.parseJwt().id) {
              if (response.player1_id !== null) {
                Userservice.getUserNameById(response.player1_id).then(
                  (name) => {
                    setCurrentPlayerName(name || "");
                  }
                );
              }
              if (response.player2_id !== null) {
                Userservice.getUserNameById(response.player2_id).then(
                  (name) => {
                    setOpponentName(name || "");
                  }
                );
              }
            } else {
              Userservice.getUserNameById(response.player1_id).then((name) => {
                setOpponentName(name || "");
              if (response.player2_id !== null) {
                Userservice.getUserNameById(response.player2_id).then(
                  (name) => {
                    setCurrentPlayerName(name || "");
                  }
                );
              }
              });
            }
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.div2}>
      <h1 className={styles.lobbyTitle}>Lobby :</h1>
        <div className={styles.lobbyGrid}>
        
        <div className={styles.lobbyGridL1C1}>
          {`${currentPlayerName}`}
          </div>
          <div className={styles.lobbyGridL1C2}>
                <div>{`${currentPlayerReady ? "est prêt" : "place ses bateaux"}`}</div>
          </div>
          <div className={styles.lobbyGridL1C3}>
            {currentPlayerReady ? (
              <img className={styles.lobbyLed} src="icons/ready_led.png"/>
            ) : (
              <img className={styles.lobbyLed} src="icons/not_ready_led.png"/>
            )}
          </div>

          <div className={styles.lobbyGridL2C1}>
            {opponentName ? (
              <div>{`${opponentName}`}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.lobbyGridL2C2}>
            {opponentName ? (
                <div>{`${opponentReady ? "est prêt" : "place ses bateaux"}`}</div>
            ) : (
              <p>En attente d'un adversaire...</p>
            )}
          </div>
          <div className={styles.lobbyGridL2C3}>
            {opponentName ? (
            <>
              {opponentReady ? (
                  <img className={styles.lobbyLed} src="icons/ready_led.png"/>
                ) : (
                  <img className={styles.lobbyLed} src="icons/not_ready_led.png"/>
                )}
            </>
            ) : (
              <div></div>
            )}

          </div>
        </div>
    </div>
  );
}