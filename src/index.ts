import express from 'express';
import { io } from 'socket.io-client';
import { Chess, ChessInstance } from 'chess.js';
import { BOTNAME, ENDPOINT } from './setup';
import nextMove, { retryMove } from './brains';

// eslint-disable-next-line @typescript-eslint/no-var-requires

const port = process.env.PORT || 3001;
const app = express();

const socket = io(ENDPOINT);

socket.on('connect', () => {
  socket.emit('REGISTER_BOT', { customBotId: BOTNAME });
});

socket.on("YOUR_MOVE", async (boardstate: string) => {
  const chess: ChessInstance = new Chess();
  chess.load(boardstate);
  const newMove = await nextMove(chess);
  socket.emit('BOT_MOVE', {botId: BOTNAME, newMove: newMove});
})

socket.on("MOVE_CONFIRMED", async (boardstate: string) => {
  // ANY LOGIC FOR CONFIRMATION
})

socket.on("MOVE_DENIED", async (boardstate: string) => {
  console.log("Oh no a bad move? Let me try again!")
  const chess: ChessInstance = new Chess();
  chess.load(boardstate);
  const newMove = await retryMove(chess);
  socket.emit('BOT_MOVE', {botId: BOTNAME, newMove: newMove});
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

