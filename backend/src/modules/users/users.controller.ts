import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Rota para obter informações do usuário autenticado
  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId)
  }
}
