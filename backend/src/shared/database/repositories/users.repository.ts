import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

//repositório para a entidade User usando o Prisma
@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  // Método para encontrar uma instância única de User
  findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDto)
  }
  // Método para criar uma nova instância de User
  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto)
  }
  // Método para atualizar uma instância existente de User
  update(updateDto: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(updateDto)
  }
}
