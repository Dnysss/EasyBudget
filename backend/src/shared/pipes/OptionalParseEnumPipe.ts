import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// A classe OptionalParseEnumPipe estende a classe ParseEnumPipe do NestJS
// para fornecer a capacidade de tratar valores opcionais.
// Essa classe é usada para análise de enums, mas permite que o valor seja
// indefinido (opcional).
export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  override transform(value: T, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return undefined
    }
    return super.transform(value, metadata)
  }
}
