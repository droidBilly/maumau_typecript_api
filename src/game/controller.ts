import {
  JsonController,
  Get,
  Post,
  HttpCode,
  Body,
  Param,
  Put,
  NotFoundError,
  Authorized,
  CurrentUser,
  Patch
} from "routing-controllers";
import Game from "./entity";
import { createGame, checkGameStatus } from "./logic";
import User from "../users/entity";
import { io } from "../index";

@JsonController()
export default class GameController {


  @Authorized()
  @Patch("/games/:gameId/join")
  async updateGame(
    @CurrentUser() user: User,
    @Param("gameId") gameId: number
  ) {
    const userId = { userid_to_player2: '' + user.id };
    const status = { status: 'player1'}
    const game = await Game.findOneById(gameId);
    Game.merge(game,userId, status).save();

    io.emit('action', {
        type: 'FETCH_CARDS',
        payload: game
    })

    return game;
  }


  @Authorized()
  @Patch("/games/:id")
  async playGame(
    @CurrentUser() user: User,
    @Param("id") gameId: number,
    @Body() cardId
  ) {
    const userId = user.id!;
    const game = await Game.findOneById(gameId);
    if (!game) throw new NotFoundError("Cannot find game");
    checkGameStatus(game);

    game.player1 = game.player1.filter(item => {
      return item != game.active;
    });
    game.player2 = game.player2.filter(item => {
      return item != game.active;
    });
    game.active = cardId.cardId;

    await Game.merge(game, userId).save();

    io.emit("action", {
      type: "FETCH_CARDS",
      payload: game
    });

    return game;
  }

  @Authorized()
  @Get("/games/:id")
  async getGame(@Param("id") id: number, @CurrentUser() user: User) {
    const userId = user.id;
    const game = await Game.findOneById(id);
    if (game) {
      if (userId === Number(game.userid_to_player1) || userId === Number(game.userid_to_player2)) {
        return game;
      } else {
        return { message: "You are not playing at this game, get out" };
      }
    } else {
      return { message: "user not found" };
    }
  }

  @Authorized()
  @Get("/games")
  async allGame() {
    const games = await Game.find();
    games.sort(function(a, b) {
      return a.id - b.id;
    });
    const new_games = games.map(game => {
      return {
        id: game.id,
        player1: game.userid_to_player1,
        player2: game.userid_to_player2
      };
    });
    return new_games;
  }

  @Authorized()
  @Post("/games")
  @HttpCode(201)
  async create(@CurrentUser() user: User) {
    const userId = { userId: user.id };
    const game = await createGame(userId).save();
    checkGameStatus(game);

    const games = await Game.find();
    games.sort(function(a, b) {
      return a.id - b.id;
    });
    const new_games = games.map(game => {
      return {
        id: game.id,
        player1: game.userid_to_player1,
        player2: game.userid_to_player2
      };
    });

    return {
      id: game.id
    };
  }
}
