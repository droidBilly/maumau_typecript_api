import Game from './entity'

export function shuffle(a) {
   for (let i = a.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [a[i], a[j]] = [a[j], a[i]];
   }
   return a;
}

export function createGame(userId) {
  let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,22,23,24,25,26,27,28,29,30,31,32]
  var randomCard = shuffle(cards)
  return Game.create({
    player1: randomCard.slice(0, 5),
    player2: randomCard.slice(5, 10),
    active: randomCard[10],
    stack: randomCard.slice(11, randomCard.length),
    userid_to_player1: userId.userId
  })
}

export function checkGameStatus(game) {

  switch(game.status) {
    case null:
      if (game.userid_to_player1 === null || game.userid_to_player2 === null ) return game.status = 'wait'
    case 'wait':
      if (!(game.userid_to_player1 === null && game.userid_to_player2 === null) ) return game.status = 'player1'
    case 'player1':
      return game.status = 'player2'
    case 'player2':
      return game.status = 'player1'
    default:
      return game.status = 'wait'
  }
}
