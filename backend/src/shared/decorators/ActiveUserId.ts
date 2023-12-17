import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'
//decorador para extrir o ID do usuário da requisição
export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const userId = request.userId

    if (!userId) throw new UnauthorizedException()
    return userId
  },
)
