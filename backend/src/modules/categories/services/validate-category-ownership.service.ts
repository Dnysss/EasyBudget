import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository'

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  // Valida se o usuário é o proprietário da categoria
  async validate(userId: string, categoryId: string) {
    // Busca a categoria no banco de dados com base no userId e categoryId
    const isOwner = await this.categoriesRepo.findFirst({
      where: { userId, id: categoryId },
    })

    // Se não encontrar a categoria, lança uma exceção NotFoundException
    if (!isOwner) throw new NotFoundException('Category not found.')
  }
}
