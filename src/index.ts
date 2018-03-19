import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import CardController from "./cards/controller";
import GameController from './game/controller'
import setupDb from './db'


const app = createKoaServer({
  cors: true,
  controllers: [
    CardController,
    GameController
    ],
})

setupDb()
  .then(_ =>
    app.listen(4003, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))
