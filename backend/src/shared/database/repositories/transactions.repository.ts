import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'

//epositório para a entidade Transaction usando o Prisma
@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // Método para encontrar várias instâncias de Transaction
  findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findManyDto)
  }
  // Método para encontrar a primeira instância de Transaction
  findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirstDto)
  }
  // Método para criar uma nova instância de Transaction
  create(createDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createDto)
  }
  // Método para atualizar uma instância existente de Transaction
  update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateDto)
  }
  // Método para excluir uma instância existente de Transaction
  delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteDto)
  }
}
