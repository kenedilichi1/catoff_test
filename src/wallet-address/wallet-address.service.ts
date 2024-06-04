import { Injectable, NotFoundException } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { DbService } from 'src/db/db.service';
import { promisify } from 'util';
import { WalletEntity } from './entity/wallet.entity';
import { CreateWalletAddressDto, UpdateWalletDto } from './dto/wallet.dto';

@Injectable()
export class WalletAddressService {
  constructor(private readonly dbService: DbService) {}

  private async createHash(userId: number) {
    const iv = randomBytes(16);
    const password = 'this is just some random key';

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = String(userId);
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return encryptedText;
  }

  async createWalletAddress(
    crateWalletAddrDto: CreateWalletAddressDto,
  ): Promise<WalletEntity> {
    try {
      const wallethash = await this.createHash(crateWalletAddrDto.userId);
      const text =
        'INSERT INTO wallets(wallethash, walletbalance, user_id, create_time) VALUES($1, $2, $3, $4) RETURNING *';
      const value = [
        wallethash.toString(),
        0.0,
        crateWalletAddrDto.userId,
        new Date(),
      ];

      const walletAddr = await this.dbService.executeQuery(text, value);
      return walletAddr[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWalletAddressWithId(walletId: number): Promise<WalletEntity> {
    try {
      const text = 'SELECT * FROM wallets WHERE id = $1';
      const values = [walletId];

      const wallet = await this.dbService.executeQuery(text, values);

      if (wallet.length < 1) {
        throw new NotFoundException('wallet not found');
      }
      return wallet[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWalletAddressWithUserId(userId: number): Promise<WalletEntity> {
    try {
      const hash = (await this.createHash(userId)).toString();
      console.log({ hash });
      const text = 'SELECT * FROM wallets WHERE user_id = $1';
      const values = [userId];

      const wallet = await this.dbService.executeQuery(text, values);

      if (wallet.length < 1) {
        throw new NotFoundException('wallet not found');
      }
      return wallet[0] as WalletEntity;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateWalletAddress(updateData: UpdateWalletDto) {
    try {
      const text = `UPDATE wallets SET ${updateData.field} = $1 WHERE id = $2`;
      const value = [updateData.value, updateData.id];

      const update = await this.dbService.executeQuery(text, value);

      const updated = update[0] === 1 ? true : false;
      return updated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteWalletAddress(walletId: number) {
    try {
      const text = 'DELETE FROM wallets WHERE id = $1';
      const value = [walletId];

      const deleteWallet = await this.dbService.executeQuery(text, value);

      console.log(deleteWallet);
      return deleteWallet[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}
