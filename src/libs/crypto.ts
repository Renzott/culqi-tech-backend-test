import * as crypto from 'crypto';

const CRYPTO_ALGORITHM = 'aes-128-gcm';

export const encryptData = (data: string, key: string) => {
    const paddedKey = Buffer.concat([Buffer.from(key), Buffer.from(key)]).slice(0, 16);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, paddedKey, iv);
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export const decryptData = (data: string, key: string) => {
    const [ivHex, authTagHex, encrypted] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const paddedKey = Buffer.concat([Buffer.from(key), Buffer.from(key)]).slice(0, 16);

    const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, paddedKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
