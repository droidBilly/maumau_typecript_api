"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const logic_1 = require("./logic");
const entity_2 = require("../users/entity");
const index_1 = require("../index");
let GamesController = class GamesController {
    async getGames(gameId, user) {
        const userId = user.id;
        const game = await entity_1.default.findOneById(gameId);
        if (game) {
            if (userId === Number(game.userId_to_player1) || userId === Number(game.userId_to_player2))
                return (game);
            else {
                return ({ message: "This user not part of this game" });
            }
        }
        else {
            return ({ message: "Game not found" });
        }
    }
    async allGames() {
        const games = await entity_1.default.find();
        games.sort(function (a, b) { return a.id - b.id; });
        const new_games = games.map(game => {
            return {
                id: game.id,
                player1: game.userId_to_player1,
                player2: game.userId_to_player2
            };
        });
        return new_games;
    }
    async create(user) {
        const userId = { userId: user.id };
        const game = await logic_1.createGame(userId).save();
        return {
            id: game.id
        };
    }
    async updateGame(user, gameId, update) {
        const userId = { userId_to_player2: user.id };
        const game = await entity_1.default.findOneById(gameId);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        entity_1.default.merge(game, update, userId).save();
        return {
            message: `The player with id ${userId.userId_to_player2} joined the game ${gameId}`
        };
    }
    async playGame(user, gameId, cardId) {
        const userId = user.id;
        const game = await entity_1.default.findOneById(gameId);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        game.player1 = game.player1.filter(item => {
            return item != game.active;
        });
        game.player2 = game.player2.filter(item => {
            return item != game.active;
        });
        game.active = cardId.cardId;
        game.played.push(game.active);
        await entity_1.default.merge(game, update).save();
        index_1.io.emit('action', {
            type: 'FETCH_CARDS',
            payload: new_game
        });
        return {
            active: new_game.active,
            cards_on_hand: new_game.player2
        };
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/games/:gameId'),
    __param(0, routing_controllers_1.Param('gameId')),
    __param(1, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_2.default]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getGames", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post('/games'),
    __param(0, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_2.default]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "create", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Put('/games/:gameId/join'),
    __param(0, routing_controllers_1.CurrentUser()),
    __param(1, routing_controllers_1.Param('gameId')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_2.default, Number, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "updateGame", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Patch('/games/:gameId'),
    __param(0, routing_controllers_1.CurrentUser()),
    __param(1, routing_controllers_1.Param('gameId')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_2.default, Number, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "playGame", null);
GamesController = __decorate([
    routing_controllers_1.JsonController()
], GamesController);
exports.default = GamesController;
//# sourceMappingURL=controller.js.map