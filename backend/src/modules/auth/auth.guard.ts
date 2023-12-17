import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { env } from 'src/shared/config/env'
import { IS_PUBLIC_KEY } from 'src/shared/decorators/IsPublic'
import { IS_RESET_PASSWORD } from 'src/shared/decorators/IsResetPassword'

//guard para garantir que apenas usuários autenticados possa acessar
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verifica se a rota é marcada como pública usando o decorador @IsPublic()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ])
    // Verifica se a rota é marcada como uma redefinição de senha usando o decorador @IsResetPassword()
    const isResetPassword = this.reflector.getAllAndOverride<boolean>(IS_RESET_PASSWORD, [
      context.getClass(),
      context.getHandler(),
    ])

    // Se a rota for pública, permite o acesso sem autenticação
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()

    // Extrai o token do cabeçalho da autorização
    const token = this.extractTokenFromHeader(request)

    // Se não houver token, lança uma exceção de não autorizado
    if (!token) {
      throw new UnauthorizedException()
    }

    // Verifica a validade do token usando o serviço JWT
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: isResetPassword ? env.resetPasswordJwtSecret : env.jwtSecret,
      })

      // Armazena o ID do usuário na requisição para uso posterior
      request['userId'] = payload.sub
    } catch {
      // Se houver qualquer problema com o token, lança uma exceção de não autorizado
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []

    return type === 'Bearer' ? token : undefined
  }
}
