import Head from "next/head";
import { GameRoomService } from "@/core/gameroom.service";
import { useEffect, useState } from "react";
import styles from "@/styles/GameRooms.module.css";
import { RoomsList } from "@/components/GameRooms";
import { GameRoom } from "@/interfaces/GameRoom";
import { Userservice } from "@/core/user.service";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { MenuButton } from "@/components/MenuButton";
import { MusicButton } from "@/components/MusicButton";

export default function findgame() {
  const router = useRouter();
  const [cookies] = useCookies(["access_token"]);
  const [rooms, setRooms] = useState<GameRoom[]>([]);

  useEffect(() => {
    async function checkCookie() {
      let res = await Userservice.checkLoginStatus(cookies.access_token);
      if (res !== 1) router.push("/");
    }

    const interval = setInterval(async () => {
      let currentRooms = await GameRoomService.getRooms();
      let loggedUserId = "";
      if (cookies.access_token !== undefined) await Userservice.parseJwt().id;

      if (currentRooms !== null) {
        currentRooms = currentRooms.filter(
          (room: any) =>
            room.player2_id === null && room.player1_id !== loggedUserId
        );
        setRooms(currentRooms);
      }
    }, 1000);

    checkCookie();
    
    return () => clearInterval(interval);
  }, [rooms]);

  return (
    <div className={styles.all}>
      <Head>
        <title>BATTLESHIP - BootyByters</title>
        <link rel="icon" href="/steeringwheel2.ico" />
      </Head>
      <MenuButton />
      <MusicButton themeLink="/sounds/codghostmenu.mp3" />
      <div className={styles.titlebox}>
        <p className={styles.p1}>LISTE &nbsp;DES &nbsp;PARTIES</p>
      </div>
      <RoomsList GameRoom={rooms} />
    </div>
  );
}
