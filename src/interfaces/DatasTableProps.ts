import { GameRoom } from "./GameRoom";
import { Ship } from "./Ship";

export interface DatasTableProps {
    ships: Ship[];
    roomDatas: GameRoom;
}