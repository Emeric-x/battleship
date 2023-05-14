import { Ship } from "@/interfaces/Ship";

export class BattleshipService {
  static async getShips() {
    const resp = await fetch('/backend/ships')
    const data = await resp.json();
    if (data.status === "success") return data.data as Ship[];
    else return null;
  }
}
