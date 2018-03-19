"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
function shuffle(cardsId) {
    for (let i = cardsId.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsId[i], cardsId[j]] = [cardsId[j], cardsId[i]];
    }
    return cardsId;
}
function createGame(userId) {
    let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    var shuffledCards = shuffle(cards);
    return entity_1.default.create({
        player1: shuffledCards.slice(0, 5),
        player2: shuffledCards.slice(5, 10),
        active: shuffledCards[10],
        stack: shuffledCards.slice(11, shuffledCards.length),
        userId_to_player1: userId.userId
    });
}
exports.createGame = createGame;
//# sourceMappingURL=logic.js.map