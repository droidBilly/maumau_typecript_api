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
let GamesController = class GamesController {
    getGames(id) {
        return entity_1.default.findOneById(id);
    }
    async allGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    async createGames(game) {
        const entity = entity_1.default.create(game);
        return entity.save();
    }
};
__decorate([
    routing_controllers_1.Get('/game/:id'),
    __param(0, routing_controllers_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getGames", null);
__decorate([
    routing_controllers_1.Get('/game'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Post('/game'),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entity_1.default]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "createGames", null);
GamesController = __decorate([
    routing_controllers_1.JsonController()
], GamesController);
exports.default = GamesController;
//# sourceMappingURL=controller.js.map