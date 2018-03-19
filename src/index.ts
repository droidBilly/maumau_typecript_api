import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import setupDb from './db'
import cardsController from "./cards/controller"
import gameController from "./games/controller"
// import usersController from "./users/controller"

const app = createKoaServer({
  cors: true,
  //, usersController
   controllers: [cardsController, gameController, ]
})

setupDb()
  .then(_ =>
    app.listen(4003, () => console.log('Listening on port 4003'))
  )
  .catch(err => console.error(err))
