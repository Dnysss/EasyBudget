import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'

import { UsersRepository } from 'src/shared/database/repositories/users.repository'
import { SigninDto } from './dto/signin-dto'
import { SignupDto } from './dto/signup-dto'
import { ForgetPasswordDto } from './dto/forget-password-dto'
import { ResetPasswordDto } from './dto/reset-password-dto'
import { env } from 'src/shared/config/env'
import { MailService } from '../mail/mail.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}
  
  // Autenticação do usuário
  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto

    // Busca o usuário no banco de dados usando o email
    const user = await this.usersRepo.findUnique({
      where: { email },
    })

    // Verifica se o usuário existe e se a senha está correta
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    // Gera um token de acesso
    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const acessToken = await this.generateAcessToken(user.id)

    return { acessToken }
  }

  // Registro de um novo usuário
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto

    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    })

    // Verifica se o email já está em uso
    if (emailTaken) {
      throw new ConflictException('This email is already in use.')
    }

    // Cria um novo usuário no banco de dados com senha criptografada
    const hashedPassword = await hash(password, 12)

    // Cria categorias padrão para o novo usuário
    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    })

    const acessToken = await this.generateAcessToken(user.id)

    return { acessToken }
  }

  // Solicitação de recuperação de senha
  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto

    const user = await this.usersRepo.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email.')
    }

    const resetToken = await this.generateResetPasswordToken(user.id)

    try {
      await this.mailService.send({
        to: email,
        subject: 'Recuperação de senha - Fincheck',
        msg: resetToken,
        isRecoverPass: true
      },)
    } catch {
      throw new ServiceUnavailableException('Error during email send.')
    }
  }

  async resetPassword(userId: string, resetPasswordDto: ResetPasswordDto) {
    const { newPassword } = resetPasswordDto

    const hashedNewPassword = await hash(newPassword, 12)

    // Atualiza a senha do usuário no banco de dados
    await this.usersRepo.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    })
  }

  private generateAcessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId })
  }

  private generateResetPasswordToken(userId: string) {
    return this.jwtService.signAsync(
      { sub: userId },
      { secret: env.resetPasswordJwtSecret, expiresIn: 300 })
  }
}
