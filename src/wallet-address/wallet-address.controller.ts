import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { AuthGuard } from 'src/auth/guard/authGuard';
import { UpdateWalletDto, WalletParamDTo } from './dto/wallet.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WalletEntity } from './entity/wallet.entity';

@ApiBearerAuth()
@ApiTags('wallet')
@UseGuards(AuthGuard)
@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @ApiResponse({
    status: 201,
    description: 'create wallet',
    type: WalletEntity,
  })
  @Post('/')
  createWallet(@Request() req) {
    const userId = req.userId;

    return this.walletAddressService.createWalletAddress({ userId });
  }

  @ApiResponse({
    status: 201,
    description: 'fetch a wallet with id',
    type: WalletEntity,
  })
  @ApiParam({ name: 'id', description: 'Wallet id to query the database with' })
  @Get('/:id')
  getWalletWithId(@Param() param: WalletParamDTo) {
    return this.walletAddressService.getWalletAddressWithId(param.id);
  }

  @ApiResponse({
    status: 201,
    description:
      'Fetch a wallet with user id. This request extracts the user id from the jwt token',
    type: WalletEntity,
  })
  @Get('/')
  getWalletWithUserId(@Request() req) {
    return this.walletAddressService.getWalletAddressWithUserId(req.userId);
  }

  @ApiResponse({
    status: 200,
    description: 'updated user',
  })
  @ApiParam({
    name: 'id',
    description: 'this is the id of the wallet to be updated',
  })
  @ApiBody({ type: UpdateWalletDto })
  @Patch('/update/:id')
  updateWallet(
    @Body() updateDto: Omit<UpdateWalletDto, 'userId'>,
    @Param() param: WalletParamDTo,
  ) {
    return this.walletAddressService.updateWalletAddress({
      ...updateDto,
      id: param.id,
    });
  }

  @ApiParam({ name: 'id', description: 'The wallet id to be deleted' })
  @ApiResponse({
    status: 200,
    description: 'deleted user',
  })
  @Delete('/delete/:id')
  deleteWallet(@Param() param: WalletParamDTo) {
    return this.walletAddressService.deleteWalletAddress(param.id);
  }
}
