import { JsonController, Get} from 'routing-controllers'
import Card from './entity'




@JsonController()
export default class CardController {

  @Get('/cards')
        async allCards() {
          const cards = await   Card.find()
          return  cards ;
      }
    }
