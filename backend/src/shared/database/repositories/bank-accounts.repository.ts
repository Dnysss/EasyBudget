import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
//repositório para a entidade BankAccount usando o prisma
@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // Método para encontrar várias instâncias de BankAccount
  findMany<T extends Prisma.BankAccountFindManyArgs>(
    findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>,
  ) {
    return this.prismaService.bankAccount.findMany(findManyDto)
  }

  // Método para encontrar a primeira instância de BankAccount
  findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirstDto)
  }

  // Método para criar uma nova instância de BankAccount
  create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto)
  }

  // Método para atualizar uma instância existente de BankAccount
  update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateDto)
  }

  // Método para excluir uma instância existente de BankAccount
  delete(deleteDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(deleteDto)
  }
}
