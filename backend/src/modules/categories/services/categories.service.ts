import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository'

//serviço responsável por fornecer funcionalidades relacionadas as categorias
@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  // Encontra todas as categorias associadas a um usuário específico
  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: { userId },
    })
  }
}
