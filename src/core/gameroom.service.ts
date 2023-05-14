export class GameRoomService {
  static async getRooms() {
    const resp = await fetch("/backend/rooms", {
      method: "GET",
    });

    const data = await resp.json();
    if (data.status === "success") return data.data as any;
    else return null;
  }

  static async getGameDatas(roomId: string) {
    const resp = await fetch(`/backend/rooms/unique/${roomId}`, {
      method: "GET",
    });

    const data = await resp.json();
    if (data.status === "success") return data.data[0] as any;
    else return null;
  }

  static async createRoom(name: string, player1_id: string) {
    const id = Math.random().toString(36).substring(2, 10); // Generate a random 8-character ID
    const roomId = id + player1_id;

    const resp = await fetch(
      `/backend/rooms/new/${roomId}/${name}/${player1_id}`,
      {
        method: "POST",
      }
    );

    const data = await resp.json();
    if (data.status === "success") return roomId;
    else return null;
  }

  static async joinRoom(roomId: string, player2_id: string) {
    const resp = await fetch(`/backend/rooms/join/${roomId}/${player2_id}`, {
      method: "POST",
    });

    const data = await resp.json();
    if (data.status === "success") return true;
    else return false;
  }

  static async checkReady(roomId: string) {
    const resp = await fetch(`/backend/rooms/ready/${roomId}`, {
      method: "GET",
    });

    const data = await resp.json();
    if (data.status === "success") return data.data[0];
    else return false;
  }

  static async SaveCoords(
    roomId: string,
    isCreator: boolean,
    shipsCoords: string
  ) {
    const resp = await fetch(`/backend/rooms/coords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: roomId,
        isPlayerCreator: isCreator,
        shipsCoord: shipsCoords,
      }),
    });

    const data = await resp.json();
    if (data.status === "success") {
      return true;
    } else {
      return false;
    }
  }

  static async Shoot(roomId: string, isCreator: boolean, shootCoord: string, player1_turn: boolean) {
    const resp = await fetch(`/backend/rooms/shoot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: roomId,
        isPlayerCreator: isCreator,
        shootCoord: shootCoord,
        player1_turn: player1_turn
      }),
    });

    const data = await resp.json();
    if (data.status === "success") {
      return true;
    } else {
      return false;
    }
  }
}
