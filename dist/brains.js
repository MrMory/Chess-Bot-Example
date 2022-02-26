"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// this will be used by the communication script to send your next move to the server
// it is expected that you return an object of type Move or ShortMove
const nextMove = (chess) => __awaiter(void 0, void 0, void 0, function* () {
    // example of a way how you can 'calculate' your next move
    const nextMove = yield makeRandomMove(chess);
    console.log('My next move: ', nextMove);
    return nextMove;
});
// a simple function that returns a random move from all possible moves
const makeRandomMove = (chess) => {
    // make a copy of the current board setup
    const game = chess;
    // look at all the possible moves
    const possibleMoves = game.moves();
    // check if the game is still going and if there are any possible moves
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
        return; // exit if game is over
    // pick a random number for the next move
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    // select the random move from all the possible moves
    const newMove = game.move(possibleMoves[randomIndex]);
    return newMove;
};
exports.default = nextMove;
//# sourceMappingURL=brains.js.map