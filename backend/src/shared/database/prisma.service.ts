import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
//serviço do prisma para interagir com o banco de dados usando o Prisma Client
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // O método onModuleInit é chamado quando o módulo é inicializado
  async onModuleInit() {
    // Conecta-se ao banco de dados ao iniciar o módulo
    await this.$connect()
  }

  // Método para habilitar ganchos de desligamento
  async enableShutdownHooks(app: INestApplication) {
    // Define um gancho para ser executado antes de sair
    this.$on('beforeExit', async () => {
      // Fecha a aplicação NestJS ao desconectar do banco de dados
      await app.close()
    })
  }
}
