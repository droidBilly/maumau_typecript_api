import { JsonController, Get, Param, Body, Post, Put, NotFoundError } from 'routing-controllers'
import Game from './entity'
import { createGame } from './logic'

@JsonController()
export default class GamesController {

  @Get('/games/:gameId/:userId')
  async getGames(
    @Param('gameId') gameId: number,
    @Param('userId') userId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (game) {
      const new_userId = Number(userId)
      if (new_userId === Number(game.userId_to_player1)) {
        return ({
          active: game.active,
          cards_on_hand: game.player1
        })
      } else if (new_userId === Number(game.userId_to_player2) ) {
      return ({
          active: game.active,
          cards_on_hand: game.player2
        })
      }
      else {
        return ({ message: "User not found" });
      }
    } else {
      return ({ message: "Game not found" });
    }
  }

  @Get('/games')
  async allGames() {
    const games = await Game.find()
    games.sort(function (a, b) { return a.id - b.id;  })
    const new_games = games.map(game => {
        return {
          id: game.id,
          player1: game.userId_to_player1
        }
      })
    return new_games
  }

  @Post('/games')
  async create(
    @Body() userId_to_player1
  ) {
    const game = await createGame(userId_to_player1).save()
    return {
      id: game.id
    }
  }

  @Put('/games/:gameId/join')
  async updateGame(
    @Param('gameId') gameId: number,
    @Body() update: Partial<Game>
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError('Cannot find game')
    Game.merge(game, update).save()
    return {
      message: `The player with id ${update.userId_to_player2} joined the game ${gameId}`
    }
  }



}
