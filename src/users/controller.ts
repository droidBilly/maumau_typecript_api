import { JsonController, Post, Param, Get, Body, Authorized, CurrentUser } from 'routing-controllers'
import User from './entity';

@JsonController()
export default class UserController {

  @Post('/users')
  async signup(
    @Body() user: User
  ) {
    const {password, ...rest} = user
    const entity = User.create(rest)
    await entity.setPassword(password)
    return entity.save()
  }

  @Authorized()
  @Get("/user")
  getUser(
     @CurrentUser() user: User
   ) {
  return user
}

  @Authorized()
  @Get('/users')
  allUsers() {
    return User.find()
  }
}
