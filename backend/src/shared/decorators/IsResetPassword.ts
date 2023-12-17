import { SetMetadata } from '@nestjs/common'
//decorador para identificar rotas que estão relacionadas ao processo de redefinição de senha
export const IS_RESET_PASSWORD = 'IS_RESET_PASSWORD'

export const isResetPassword = () => SetMetadata(IS_RESET_PASSWORD, true)
