import Head from "next/head";
import styles from "@/styles/Ingame.module.css";
import { useEffect, useState } from "react";
import { Userservice } from "@/core/user.service";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { MyMap } from "@/components/MyMap";
import { OpponentMap } from "@/components/OpponentMap";
import { GameRoomService } from "@/core/gameroom.service";
import Loading from "./loading";
import { MenuButton } from "@/components/MenuButton";
import { MusicButton } from "@/components/MusicButton";
import { CpeButton } from "@/components/CpeButton";

export default function InGame() {
  const router = useRouter();
  const [cookies] = useCookies(["access_token"]);
  const { roomId } = router.query;
  const [roomDatas, setRoomDatas] = useState<any>([]);
  const [isUserPlayer1, setIsUserPlayer1] = useState<boolean>(false);

  const TurnOfWhoPrint = () => {
    const [text, setText] = useState(
      (roomDatas.player1_turn && isUserPlayer1) ||
        (!roomDatas.player1_turn && !isUserPlayer1)
        ? "Votre tour"
        : "Tour de l'adversaire"
    );

    return <div className={text === "Votre tour"
    ? styles.yourTurnInformation
    : styles.opponentTurnInformation}>{text}</div>;
  };

  useEffect(() => {
    async function checkCookie() {
      let res = await Userservice.checkLoginStatus(cookies.access_token);
      if (res !== 1) router.push("/");
    }

    const interval = setInterval(async () => {
      if (roomId !== undefined) {
        let res = await GameRoomService.getGameDatas(roomId as string);

        if (res !== null) {
          if (res.player1_id == null || res.player2_id == null)
            router.push("/404");
          setRoomDatas(res);

          if(roomDatas || roomDatas !== undefined) setIsUserPlayer1(roomDatas.player1_id == Userservice.parseJwt().id);
        } else router.push("/404");
      }

      let isGameFinished : boolean = checkIfGameFinished();
      if (isGameFinished) {
        alert("Partie terminée !");
        router.push("/findgame");
      }
    }, 500);

    checkCookie();

    return () => clearInterval(interval);
  }, [roomDatas]);

  function checkIfGameFinished() {
    if (
      roomDatas &&
      roomDatas.player1_board !== undefined &&
      roomDatas.player2_board !== undefined &&
      roomDatas.player1_shots !== undefined &&
      roomDatas.player2_shots !== undefined
    ) {
      let player1Ships = roomDatas.player1_board.split(" ");
      let player2Ships = roomDatas.player2_board.split(" ");
      let player1Shots = roomDatas.player1_shots.split(" ");
      let player2Shots = roomDatas.player2_shots.split(" ");
      let player1ShipsTouched = 0;
      let player2ShipsTouched = 0;

      for (let i = 0; i < player1Shots.length; i++) {
        if (player2Ships.includes(player1Shots[i])) player2ShipsTouched++;
      }
      for (let i = 0; i < player2Shots.length; i++) {
        if (player1Ships.includes(player2Shots[i])) player1ShipsTouched++;
      }

      if (
        player1ShipsTouched === player1Ships.length ||
        player2ShipsTouched === player2Ships.length
      )
        return true;
    }
    return false;
  }

  // if roomId is undefined for 2 seconds, redirect to 404 and show loading while it's undefined
  if (roomId === undefined || roomId === "") {
    setTimeout(() => {
      if (roomId === undefined || roomId === "") router.push("/404");
    }, 10000);
    return <Loading />;
  } else {
    return (
      <div className={styles.all}>
        <Head>
          <title>BATTLESHIP - BootyByters</title>
          <link rel="icon" href="/steeringwheel2.ico" />
        </Head>
        <main className={styles.main}>
          <MusicButton themeLink="/sounds/ingameTheme.mp3" />
          <div className={styles.titlebox}>
            <p className={styles.p1}>Partie &nbsp;"{roomDatas.name}"</p>
          </div>
          <TurnOfWhoPrint />
          <div className={styles.globalGrid}>
            <div className={styles.myGrid}>
              <MyMap roomDatas={roomDatas} />
            </div>
            <div className={styles.opponentGrid}>
              <OpponentMap roomDatas={roomDatas} />
            </div>
            <div className={styles.myMapTitle}><p>Votre flotte</p></div>
            <div className={styles.opponentMapTitle}><p>Flotte ennemie</p></div>
          </div>
        </main>
      </div>
    );
  }
}
