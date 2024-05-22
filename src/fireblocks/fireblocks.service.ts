import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FireblocksSDK } from 'fireblocks-sdk';
import { AuthService } from 'src/auth/auth.service';
import * as fs from 'fs/promises';  // Use fs/promises for async operations

@Injectable()
export class FireblocksService {
  private fireblocks: FireblocksSDK;

  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService
  ) {
    this.initializeFireblocks();
  }

  private async initializeFireblocks() {
    try {
      const apiKey = this.configService.get<string>('FIREBLOCKS_API_KEY');
      const privateKeyPath = './fireblocks_secret.key';  // Path to your private key file
      const privateKey = await fs.readFile(privateKeyPath, 'utf8');  // Read private key as a string
      this.fireblocks = new FireblocksSDK(privateKey, apiKey);
    } catch (error) {
      console.error('Failed to initialize Fireblocks SDK:', error);
      throw error;  // Throw an error or handle it depending on your application's needs
    }
  }

  async generateAddressForUser(userId: string, assetId: string = 'ETH_TEST5') {
    try {
      const vaultAccountId = this.configService.get<string>('VAULT_ACCOUNT_ID');  // Adjust as necessary
      const response = await this.fireblocks.generateNewAddress(vaultAccountId, assetId);
      await this.authService.setUserAddress(userId, response.address);
      return response.address;
    } catch (error) {
      console.error('API request failed:', error.response?.data || error.message);
      throw new Error('Failed to generate address due to API error');
    }

  }
}
