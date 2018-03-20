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
let GameController = class GameController {
    async updateGame(user, id, update) {
        const userId = { userid_to_player2: user.id };
        const game = await entity_1.default.findOneById(id);
        if (!game)
            throw new routing_controllers_1.NotFoundError('Cannot find game');
        entity_1.default.merge(game, update, userId).save();
        return {
            message: `The player with id ${userId.userid_to_player2} joined the game ${id}`
        };
    }
    async getGame(id, user) {
        const userId = user.id;
        const game = await entity_1.default.findOneById(id);
        if (game) {
            if (userId === Number(game.userid_to_player1)) {
                return ({
                    active: game.active,
                    player1: game.player1,
                });
            }
            else if (userId === Number(game.userid_to_player2)) {
                return ({
                    active: game.active,
                    player2: game.player2,
                });
            }
            else {
                return ({ message: "You are not playing at this game, get out" });
            }
        }
        else {
            return ({ message: "user not found" });
        }
    }
    async allGame() {
        const games = await entity_1.default.find();
        games.sort(function (a, b) { return a.id - b.id; });
        const new_games = games.map(game => {
            return {
                id: game.id,
                player1: game.userid_to_player1,
                player2: game.userid_to_player2
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
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Put('/games/:id/join'),
    __param(0, routing_controllers_1.CurrentUser()),
    __param(1, routing_controllers_1.Param('id')),
    __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_2.default, Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get("/games/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, entity_2.default]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGame", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get("/games"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "allGame", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post("/games"),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_2.default]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "create", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map