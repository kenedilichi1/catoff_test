import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsNumberString, IsString } from 'class-validator';

export class WalletEntity {
  @ApiProperty({
    example: 1,
    description: 'wallet Id',
  })
  @IsNumberString()
  id: number;

  @ApiProperty({
    example: 'some hash',
    description: 'wallet hash',
  })
  @IsString()
  wallethash: string;

  @ApiProperty({
    example: 0.005,
    description: 'wallet balance',
  })
  @IsNumber()
  walletbalance: string;

  @ApiProperty({
    example: 4,
    description: 'user id',
  })
  @IsNumberString()
  user_id: number;

  @ApiProperty({
    example: '2024-06-13',
    description: 'time of creation',
  })
  @IsDate()
  create_time: Date;
}
