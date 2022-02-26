import { ChessInstance } from "chess.js";

type Color = 'BLACK' | 'WHITE';

export interface BaseEvent {
  gameId: string;
  yourColor: Color;
  board: ChessInstance;
}

export interface GameEvent extends BaseEvent {
  type: 'YOUR_MOVE';
}