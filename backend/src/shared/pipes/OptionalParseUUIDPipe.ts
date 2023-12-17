import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common'

// A classe OptionalParseUUIDPipe estende a classe ParseUUIDPipe do NestJS
// para fornecer a capacidade de tratar valores opcionais (undefined).
export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  override transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return undefined
    }
    return super.transform(value, metadata)
  }
}
