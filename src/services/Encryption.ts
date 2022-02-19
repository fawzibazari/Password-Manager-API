import * as crypto from 'crypto';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const secret: any = process.env.SECRET_CRYPTO;

export class EncryptionServices {
  static async encrypt(password: string) {
    // iv is an identifiar so it can identifie the password, btw we will need it for the decrypt function
    const iv = Buffer.from(crypto.randomBytes(16));
    const cypher = crypto.createCipheriv(
      'aes-256-ctr',
      Buffer.from(secret),
      iv,
    );

    const EncryptedPassword = Buffer.concat([
      cypher.update(password),
      cypher.final(),
    ]);

    return {
      iv: iv.toString('hex'),
      password: EncryptedPassword.toString('hex'),
    };
  }

  static async decrypt(EncryptedPassword: any) {
    const decipher = crypto.createDecipheriv(
      'aes-256-ctr',
      Buffer.from(secret),
      Buffer.from(EncryptedPassword.iv, 'hex'),
    );
    const decryptedPassword = Buffer.concat([
      decipher.update(Buffer.from(EncryptedPassword.password, 'hex')),
      decipher.final(),
    ]);
    return decryptedPassword.toString();
  }
}
