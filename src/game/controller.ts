import { JsonController, Get, Post,  HttpCode,  Body, Param, Put, NotFoundError } from "routing-controllers";
import Game from "./entity";
import { createGame } from "./logic";


@JsonController()
export default class GameController {


  @Put('/games/:id/join')
        async updateGame(
          @Param('id') id: number,
          @Body() update: Partial<Game>
        ) {
          const game = await Game.findOneById(id)
          if (!game) throw new NotFoundError('Cannot find game')

          Game.merge(game, update).save()
          return {
            message: `The player with id ${update.userid_to_player2} joined the game ${id}`
          }
        }

  @Get("/games/:id/:userId")
  async getGame(
    @Param("id") id: number,
    @Param("userId") userId: number
  ) {
    const game = await Game.findOneById(id);
    if (game) {
      const newUserId = Number(userId);
      const gameUserId = Number(game.userid_to_player1)
      if ( newUserId ===  gameUserId) {
        return ({
          active: game.active,
          player1: game.player1
        });
      } else if (userId === Number(game.userid_to_player2)) {
        return ({
          active: game.active,
          player2: game.player2
        });
      } else {
        return ({message: "user not found"})
      }
    }  else {
      return ({message: "user not found"})
    }
  }

  @Get("/games")
  async allGame() {
    const games = await Game.find();
    games.sort(function (a, b) { return a.id - b.id;  })
    const new_games = games.map(game => {
      return {
        id: game.id,
        player1: game.userid_to_player1
      };
    });
    return  new_games ;
  }

  @Post("/games")
  @HttpCode(201)
  async create(@Body() userid_to_player1) {
    const game = await createGame(userid_to_player1).save();
    return {
      id: game.id
    };
  }
}
