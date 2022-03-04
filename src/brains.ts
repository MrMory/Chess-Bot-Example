// all documentation for the chess package can be found here:
// https://github.com/jhlywa/chess.js/blob/master/README.md
import { ChessInstance, Move, ShortMove } from "chess.js";

// this will be used by the communication script to send your next move to the server
// it is expected that you return an object of type Move or ShortMove
const nextMove = async (chess: ChessInstance): Promise<Move | ShortMove> => {
  // example of a way how you can 'calculate' your next move
  const nextMove = await makeRandomMove(chess);
  console.log('My next move: ', nextMove);
  return nextMove;
}

export const retryMove = async (chess : ChessInstance): Promise<Move | ShortMove> => {
  const nextMove = await makeRandomMove(chess);
  console.log('My next move: ', nextMove);
  return nextMove;
}

// a simple function that returns a random move from all possible moves
const makeRandomMove = (chess: ChessInstance) => {
  // make a copy of the current board setup
  const game = chess;
  // look at all the possible moves
  const possibleMoves = game.moves({verbose: true});
  // check if the game is still going and if there are any possible moves
  if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if game is over
  // pick a random number for the next move
  const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  // select the random move from all the possible moves
  const newMove = game.move(possibleMoves[randomIndex]);
  return newMove;
}

export default nextMove;