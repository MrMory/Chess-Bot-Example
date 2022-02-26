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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_client_1 = require("socket.io-client");
const chess_js_1 = require("chess.js");
const setup_1 = require("./setup");
const brains_1 = __importDefault(require("./brains"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
const socket = (0, socket_io_client_1.io)(setup_1.ENDPOINT);
socket.on('connect', () => {
    socket.emit('REGISTER_BOT', { customBotId: setup_1.BOTNAME });
});
socket.on("YOUR_MOVE", (boardstate) => __awaiter(void 0, void 0, void 0, function* () {
    const chess = new chess_js_1.Chess();
    chess.load(boardstate);
    const newMove = yield (0, brains_1.default)(chess);
    socket.emit('BOT_MOVE', { botId: setup_1.BOTNAME, newMove: newMove });
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map