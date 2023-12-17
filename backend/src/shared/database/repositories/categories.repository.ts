import { Injectable } from '@nestjs/common'
import { type Prisma } from '@prisma/client'
import { PrismaService } from '../prisma.service'
//repositório para a entidade Category usando o prisma
@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  // Método para encontrar várias instâncias de Category
  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto)
  }
  // Método para encontrar a primeira instância de Category
  findFirst(findFirstDto: Prisma.CategoryFindFirstArgs) {
    return this.prismaService.category.findFirst(findFirstDto)
  }
}
