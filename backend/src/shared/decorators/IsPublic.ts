import { SetMetadata } from '@nestjs/common'

//ecorador para marcar uma rota como pública
export const IS_PUBLIC_KEY = 'IS_PUBLIC'

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true)
