import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateWalletAddressDto {
  @IsNumberString()
  userId: number;
}

export class UpdateWalletDto {
  @ApiProperty({
    example: 'walletbalance',
    description: 'field to be updated',
  })
  @IsString()
  field: string;

  @ApiProperty({
    example: 5.1,
    description: 'value of the field to be updated',
  })
  value: string | number;

  @IsNumberString()
  id: number;
}

export class WalletParamDTo {
  @ApiProperty()
  @IsNumberString()
  id: number;
}
