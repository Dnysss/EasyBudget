import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator'

// Define a classe para representar as variáveis de ambiente
class Env {
  @IsString()
  @IsNotEmpty()
    dbURL: string

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
    jwtSecret: string

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_jwt_secret')
    resetPasswordJwtSecret: string

  @IsString()
  @IsNotEmpty()
    emailUser: string

  @IsString()
  @IsNotEmpty()
    emailPassword: string

  @IsString()
  @IsNotEmpty()
    frontendUrl: string
}

// Converte as variáveis de ambiente para uma instância da classe Env
export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  resetPasswordJwtSecret: process.env.RESET_PASSWORD_JWT_SECRET,
  dbURL: process.env.DATABASE_URL,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  frontendUrl: process.env.FRONTEND_URL
})

// Valida as propriedades da instância da classe Env
const errors = validateSync(env)

// Se houver erros de validação, lança um erro com detalhes
if (errors.length > 0) throw new Error(JSON.stringify(errors, null, 2))
