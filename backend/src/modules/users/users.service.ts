import { Injectable } from '@nestjs/common'
import { UsersRepository } from 'src/shared/database/repositories/users.repository'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
// Método para obter informações específicas de um usuário com base no ID
  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    })
  }
}
