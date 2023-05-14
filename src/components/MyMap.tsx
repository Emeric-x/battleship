import { GameRoomService } from "@/core/gameroom.service";
import { Userservice } from "@/core/user.service";
import Loading from "@/pages/loading";
import styles from "@/styles/Ingame.module.css";
import { useEffect, useState } from "react";

export function MyMap({ roomDatas }: any) {
  const [shipsCoords, setShipsCoords] = useState<string[]>([]);
  const [enemyShots, setEnemyShots] = useState<string[]>([]);
  const clickZones = [];

  useEffect(() => {
    const interval = setInterval(() => {
      if (roomDatas !== null && roomDatas !== undefined) {
        const currentPlayerId = Userservice.parseJwt().id;
        const currentPlayerBoard =
          roomDatas.player1_id === currentPlayerId
            ? roomDatas.player1_board
            : roomDatas.player2_board;
        const newShipsCoords = currentPlayerBoard
          ? currentPlayerBoard.split(" ")
          : [];
        setShipsCoords(newShipsCoords);

        const playerShots =
          currentPlayerId === roomDatas.player1_id
            ? roomDatas.player2_shots
            : roomDatas.player1_shots;
        const newEnemyShots = playerShots ? playerShots.split(" ") : [];
        setEnemyShots(newEnemyShots);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [roomDatas]);

  if (!roomDatas || roomDatas === undefined) {
    return <Loading />;
  } else {
    for (let i = 1; i <= 10; i++) {
      const row = [];
      for (let j = 1; j <= 10; j++) {
        const id = `clickZone${i}-${j}`;
        row.push(
          <div key={id} className={styles.clickZone} id={id}>
            {shipsCoords.includes(`${i}-${j}`) && !enemyShots.includes(`${i}-${j}`)
              ? (<div className={styles.ship}>&nbsp;&nbsp;</div>)
              : shipsCoords.includes(`${i}-${j}`) && enemyShots.includes(`${i}-${j}`)
                ? (<div className={styles.shipTouched}>
                  <video autoPlay src="/icons/boom.mp4" />
                  </div>)
                : !shipsCoords.includes(`${i}-${j}`) && enemyShots.includes(`${i}-${j}`)
                  ? (<div className={styles.shipMissed}>
                  <img src="/icons/cross2.png" />
                  <audio autoPlay src="/sounds/missedShot.mp3" />
                  </div>)
                  : null}
          </div>
        );
      }
      clickZones.push(
        <div key={i} className={styles.row}>
          {row}
        </div>
      );
    }

    return (
      <div>
        <div className={styles.column2}>
          <div className={styles.grid}>{clickZones}</div>
        </div>
      </div>
    );
  }
}
