import * as crypto from 'crypto';

const CRYPTO_ALGORITHM = 'aes-192-cbc';

export const encryptData = (data: string, key: string) => {
    const iv = crypto.randomBytes(16);
    const bufferKey = Buffer.from(key, 'utf8');
    const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, bufferKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted.toString()}`;
}

export const decryptData = (data: string, key: string) => {
    const [iv, encrypted] = data.split(':');
    const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, Buffer.from(key), Buffer.from(iv, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted.toString();
}