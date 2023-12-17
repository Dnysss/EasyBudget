import { Injectable } from '@nestjs/common'
import { CreateTransactionDto } from '../dto/create-transaction.dto'
import { UpdateTransactionDto } from '../dto/update-transaction.dto'
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository'
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service'
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service'
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service'
import { TransactionType } from '../entities/Transaction'

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  // Método para criar uma transação
  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto

    // Valida se o usuário é o proprietário das entidades relacionadas (banco, categoria, etc.)
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
    })

    // Cria a transação no banco de dados
    return this.transactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    })
  }

  // Método para obter todas as transações de um usuário com filtros opcionais
  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepo.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
        bankAccountId: filters.bankAccountId,
        type: filters.type,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    })
  }

  // Método para atualizar uma transação
  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto

    // Valida se o usuário é o proprietário das entidades relacionadas (banco, categoria, etc.)
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    })

    // Atualiza a transação no banco de dados
    return this.transactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    })
  }

  // Método para remover uma transação
  async remove(userId: string, transactionId: string) {
    // Valida se o usuário é o proprietário das entidades relacionadas (banco, categoria, etc.)
    await this.validateEntitiesOwnership({ userId, transactionId })

    // Remove a transação do banco de dados
    await this.transactionsRepo.delete({
      where: { id: transactionId },
    })
  }

  // Método privado para validar a propriedade do usuário nas entidades relacionadas
  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    // Validação de propriedade para transação
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      // Validação de propriedade para conta bancária
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      // Validação de propriedade para categoria
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
    ])
  }
}
