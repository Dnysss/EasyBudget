import { Injectable } from '@nestjs/common'
import { CreateBankAccountDto } from '../dto/create-bank-account.dto'
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto'
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository'
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service'

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}
  // Cria uma nova conta bancária associada a um usuário
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto

    return this.bankAccountsRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    })
  }

  // Obtém todas as contas bancárias associadas a um usuário, incluindo informações sobre transações
  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    })

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      )

      const currentBalance = bankAccount.initialBalance + totalTransactions

      return {
        ...bankAccount,
        currentBalance,
      }
    })
  }

  // Atualiza os detalhes de uma conta bancária existente
  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    // Verifica se o usuário tem permissão para atualizar a conta bancária
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )

    const { color, initialBalance, name, type } = updateBankAccountDto

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    })
  }

  // Remove uma conta bancária existente
  async remove(userId: string, bankAccountId: string) {
    // Verifica se o usuário tem permissão para remover a conta bancária
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )

    // Deleta a conta bancária
    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    })

    return null
  }
}
