import { Injectable, NotFoundException } from '@nestjs/common'
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository'

//serviço responsável por validar se um usuário é o proprietário de uma conta
@Injectable()
export class ValidateBankAccountOwnershipService {
  // Valida se o usuário é o proprietário da conta bancária
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    // Busca a conta bancária com o ID específico associada ao usuário
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: { userId, id: bankAccountId },
    })

    // Se não for o proprietário, lança uma exceção de 'NotFoundException'
    if (!isOwner) throw new NotFoundException('Bank account not found.')
  }
}
