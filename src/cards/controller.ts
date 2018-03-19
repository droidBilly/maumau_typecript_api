import { JsonController, Get, Param } from 'routing-controllers'
import Card from './entity'

@JsonController()
export default class CardsController {

  @Get('/cards/:id')
  getCard(
    @Param('id') id: number
  ) {
    return Card.findOneById(id)
  }

  @Get('/cards')
  async allCards() {
    const cards = await Card.find()
    return cards
  }
}
