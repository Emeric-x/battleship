import { GameRoomService } from "@/core/gameroom.service";
import { Userservice } from "@/core/user.service";
import Loading from "@/pages/loading";
import styles from "@/styles/Ingame.module.css";
import { useEffect, useState } from "react";

export function OpponentMap({ roomDatas }: any) {
  const [disabledClickZones, setDisabledClickZones] = useState<string[]>([]);
  const [shipsCoords, setShipsCoords] = useState<string[]>([]);
  const [isUserPlayer1, setIsUserPlayer1] = useState<boolean>(false);

  useEffect(() => {
    if (
      roomDatas &&
      roomDatas.player1_board !== undefined &&
      roomDatas.player2_board !== undefined
    ) {
      let shipsCoords = null;

      setIsUserPlayer1(roomDatas.player1_id == Userservice.parseJwt().id);

      if (isUserPlayer1) {
        shipsCoords = roomDatas.player2_board
          ? roomDatas.player2_board.split(" ")
          : [];
      } else {
        shipsCoords = roomDatas.player1_board
          ? roomDatas.player1_board.split(" ")
          : [];
      }
      setShipsCoords(shipsCoords);
    }
  }, [roomDatas]);

  if (roomDatas === undefined) {
    return <Loading />;
  }

  const handleOnClick = (clickZone: string) => {
    if (
      (roomDatas.player1_turn == 1 && isUserPlayer1) ||
      (roomDatas.player1_turn == 0 && !isUserPlayer1)
    ) {
      clickZone = clickZone.replace("clickZone", "");

      if (!disabledClickZones.includes(clickZone)) {
        let roomId = roomDatas.id;
        let isCreator: boolean = isUserPlayer1;

        let touched = shipsCoords.includes(clickZone);
        if (!touched) {
          roomDatas.player1_turn = roomDatas.player1_turn ? 0 : 1;
          GameRoomService.Shoot(
            roomId,
            isCreator,
            clickZone,
            roomDatas.player1_turn
          );
        } else {
          GameRoomService.Shoot(
            roomId,
            isCreator,
            clickZone,
            roomDatas.player1_turn
          );
        }
        // Add the clicked div's ID to the disabledClickZones array
        setDisabledClickZones((prevDisabledClickZones) => [
          ...prevDisabledClickZones,
          clickZone,
        ]);
      }
    }

    console.log(disabledClickZones);
  };

  const clickZones = [];
  for (let i = 1; i <= 10; i++) {
    const row = [];
    for (let j = 1; j <= 10; j++) {
      const id = `clickZone${i}-${j}`;
      const clickZoneCoord = `${i}-${j}`;

      row.push(
        <div
          key={id}
          className={`${
            (roomDatas.player1_turn && !isUserPlayer1) ||
            (!roomDatas.player1_turn && isUserPlayer1)
            ? styles.OpponentTurn
            : (disabledClickZones.includes(clickZoneCoord) && shipsCoords.includes(clickZoneCoord))
              ? styles.OpponentTouchedClickZone
              : disabledClickZones.includes(clickZoneCoord)
              ? styles.OpponentDisabledClickZone
              : styles.OpponentClickZone
          }`}
          id={id}
          onClick={
            disabledClickZones.includes(id)
              ? undefined
              : () => handleOnClick(id)
          }
        > {disabledClickZones.includes(clickZoneCoord) && shipsCoords.includes(clickZoneCoord)
            ? (<div className={styles.shipTouched}>
              <video autoPlay src="/icons/enemyMapBoom.mp4" />
              </div>)
            : disabledClickZones.includes(clickZoneCoord)
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
      <div className={styles.column4}>
        <div className={styles.grid}>{clickZones}</div>
      </div>
    </div>
  );
}
