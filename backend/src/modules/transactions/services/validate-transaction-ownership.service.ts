import { Injectable, NotFoundException } from '@nestjs/common'
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository'

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}
  // Método para validar se o usuário é o proprietário da transação
  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: { userId, id: transactionId },
    })
    
    // Se a transação não pertence ao usuário, lança uma exceção NotFoundException
    if (!isOwner) throw new NotFoundException('Transaction not found.')
  }
}
