import styles from "@/styles/GameRooms.module.css";
import { useState, useEffect } from "react";
import { GameRoomService } from "@/core/gameroom.service";
import { useCookies } from "react-cookie";
import { Userservice } from "@/core/user.service";
import { useRouter } from "next/router";
import React from "react";

export function RoomsList({ GameRoom }: any) {
  const router = useRouter();
  const [cookies] = useCookies(["access_token"]);
  const [roomName, setRoomName] = useState("");

  const audioHoverRef = React.useRef<HTMLAudioElement>(null);
  function hoverSound() {
    if (audioHoverRef.current) {
      audioHoverRef.current.volume = 0.5;
      audioHoverRef.current.play();
    }
  }

  const audioClicRef = React.useRef<HTMLAudioElement>(null);
  function clickSound() {
    if (audioClicRef.current) {
      audioClicRef.current.volume = 0.5;
      audioClicRef.current.play();
    }
  }

  useEffect(() => {
    async function checkCookie() {
      let res = await Userservice.checkLoginStatus(cookies.access_token);
      if (res !== 1) router.push("/");
    }

    checkCookie();
  }, []);

  const handleCreateRoom = async () => {
    let playerId: string = "";
    playerId = await Userservice.parseJwt().id;

    let roomID: any = await GameRoomService.createRoom(roomName, playerId);

    if (roomID !== null) router.push(`/preparation?roomId=${roomID}`);
  };

  async function joinRoom(roomId: string) {
    let playerId: string = "";
    if (cookies.access_token !== undefined)
      playerId = await Userservice.parseJwt().id;

    let res: boolean = await GameRoomService.joinRoom(roomId, playerId);

    if (res) router.push(`/preparation?roomId=${roomId}`);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      document.getElementById("createButton")?.click();
    }
  };

  return (
    <>
      <audio ref={audioHoverRef}>
        <source src="/sounds/hoverSound.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={audioClicRef}>
        <source src="/sounds/clickSound.mp3" type="audio/mpeg" />
      </audio>
      <div className={styles.roomsContainer}>
        <ul className={styles.roomsList}>
          {GameRoom.length === 0 ? (
            <p>Aucune partie rejoignable</p>
          ) : (
            GameRoom.filter((room: any) => room.player2_id === null && room.player1_id !== Userservice.parseJwt().id).map((room: any) => (
              <li
                key={room.id}
                onMouseEnter={hoverSound}
                onDoubleClick={() => joinRoom(room.id)}
              >
                <span>{room.name}</span>
                <button
                  onClick={() => {
                    clickSound();
                    joinRoom(room.id);
                  }}
                >
                  Rejoindre
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className={styles.inputTitle}>Créer une partie</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Nom de la partie"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          id="createButton"
          onClick={() => {
            clickSound();
            handleCreateRoom();
          }}
        >
          Créer
        </button>
      </div>
    </>
  );
}
