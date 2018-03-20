import { JsonController, CurrentUser, Get, Param, Body, Post, Put, NotFoundError, Authorized } from 'routing-controllers'
import Game from './entity'
import { createGame } from './logic'
import User from '../users/entity'

@JsonController()
export default class GamesController {

  @Authorized()
  @Get('/games/:gameId')
  async getGames(
    @Param('gameId') gameId: number,
    @CurrentUser() user: User
  ) {
    const userId = user.id
    const game = await Game.findOneById(gameId)
    if (game) {
      const new_userId = userId

      if (new_userId === Number(game.userId_to_player1)) {
        return ({
          active: game.active,
          cards_on_hand: game.player1
        })
      } else if (new_userId === Number(game.userId_to_player2)) {
      return ({
          active: game.active,
          cards_on_hand: game.player2
        })
      }
      else {
        return ({ message: "This user not part of this game" });
      }
    } else {
      return ({ message: "Game not found" });
    }
  }

  @Authorized()
  @Get('/games')
  async allGames() {
    const games = await Game.find()
    games.sort(function (a, b) { return a.id - b.id;  })
    const new_games = games.map(game => {
        return {
          id: game.id,
          player1: game.userId_to_player1,
          player2: game.userId_to_player2
        }
      })
    return new_games
  }

  @Authorized()
  @Post('/games')
  async create(
    @CurrentUser() user: User,
  ) {
    const userId = {userId: user.id}
    const game = await createGame(userId).save()
    return {
      id: game.id
    }
  }

  @Authorized()
  @Put('/games/:gameId/join')
  async updateGame(
    @CurrentUser() user: User,
    @Param('gameId') gameId: number,
    @Body() update: Partial<Game>
  ) {
    const userId = {userId_to_player2: user.id}
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError('Cannot find game')
    Game.merge(game, update, userId).save()
    return {
      message: `The player with id ${userId.userId_to_player2} joined the game ${gameId}`
    }
  }



}
