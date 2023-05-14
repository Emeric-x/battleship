import Head from "next/head";
import { BattleshipService } from "@/core/battleship.service";
import { useEffect, useState } from "react";
import { Ship } from "@/interfaces/Ship";
import Map from "@/components/MapViewer";
import styles from "@/styles/Preparation.module.css";
import Loading from "@/pages/loading";
import { MenuButton } from "@/components/MenuButton";
import { MusicButton } from "@/components/MusicButton";
import { useCookies } from "react-cookie";
import { Userservice } from "@/core/user.service";
import { useRouter } from "next/router";
import { GameRoomService } from "@/core/gameroom.service";
import { LobbyComponent } from "@/components/LobbyComponent";
import { Rules } from "@/components/Rules";

export default function Preparation() {
  const router = useRouter();
  const [cookies] = useCookies(["access_token"]);
  const [ships, setShips] = useState<Ship[]>([]);
  const { roomId } = router.query;
  const [roomDatas, setRoomDatas] = useState<any>([]);

  useEffect(() => {
    async function checkCookie() {
      let res = await Userservice.checkLoginStatus(cookies.access_token);
      if (res !== 1) router.push("/");
    }

    async function getGameDatas() {
      if (roomId !== undefined) {
        let res = await GameRoomService.getGameDatas(roomId as string);

        if (res !== null) {
          setRoomDatas(res);
          localStorage.setItem("roomDatas", JSON.stringify(res));
        } else router.push("/404");
      }
    }

    async function getShips() {
      const currentShips = await BattleshipService.getShips();
      setShips(currentShips!);
    }

    const interval = setInterval(() => {
      GameRoomService.checkReady(roomId as string).then((response) => {
        if (response !== null) {
          if (response.player1_ready && response.player2_ready)
            router.push(`/ingame?roomId=${roomId}`);
        }
      });
    }, 1000);

    checkCookie();
    getGameDatas();
    getShips();

    return () => clearInterval(interval);
  }, [roomId]);

  // while the server hasn't responded
  if (ships.length === 0) {
    return <Loading />;
  }

  // if roomId undefined for 2 seconds redirect to 404 and while he's undefined show loading
  if (roomId === undefined) {
    setTimeout(() => {
      if (roomId === undefined) router.push("/404");
    }, 2000);
    return <Loading />;
  }

  if (roomId === "") {
    setTimeout(() => {
      if (roomId === "") router.push("/404");
    }, 2000);
    return <Loading />;
  }

  return (
    <div className={styles.all}>
      <Head>
        <title>BATTLESHIP - BootyByters</title>
        <link rel="icon" href="/steeringwheel2.ico" />
      </Head>
      <MenuButton />
      <MusicButton themeLink="/sounds/codbo2adrenaline.mp3" />
      <div className={styles.titlebox}>
        <p className={styles.p1}>PHASE &nbsp;DE &nbsp;PREPARATION</p>
      </div>
      <div className={styles.map}>
        <Map ships={ships} roomDatas={roomDatas} />
        <div className={styles.column3}>
          <Rules />
          <LobbyComponent roomDatas={roomDatas} />
        </div>
      </div>
    </div>
  );
}
