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
let GamesController = class GamesController {
    async getGames(gameId, userId) {
        const game = await entity_1.default.findOneById(gameId);
        if (game) {
            const new_userId = Number(userId);
            if (new_userId === Number(game.userId_to_player1)) {
                return ({
                    active: game.active,
                    cards_on_hand: game.player1
                });
            }
            else if (new_userId === Number(game.userId_to_player2)) {
                return ({
                    active: game.active,
                    cards_on_hand: game.player2
                });
            }
            else {
                return ({ message: "User not found" });
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
                player1: game.userId_to_player1
            };
        });
        return new_games;
    }
    async create(userId_to_player1) {
        const game = await logic_1.createGame(userId_to_player1).save();
        return {
            id: game.id
        };
    }
    async updateGame(gameId, update) {
        const game = await entity_1.default.findOneById(gameId);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        entity_1.default.merge(game, update).save();
        return {
            message: `The player with id ${update.userId_to_player2} joined the game ${gameId}`
        };
    }
};
__decorate([
    routing_controllers_1.Get('/games/:gameId/:userId'),
    __param(0, routing_controllers_1.Param('gameId')),
    __param(1, routing_controllers_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getGames", null);
__decorate([
    routing_controllers_1.Get('/games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Post('/games'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "create", null);
__decorate([
    routing_controllers_1.Put('/games/:gameId/join'),
    __param(0, routing_controllers_1.Param('gameId')),
    __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "updateGame", null);
GamesController = __decorate([
    routing_controllers_1.JsonController()
], GamesController);
exports.default = GamesController;
//# sourceMappingURL=controller.js.map