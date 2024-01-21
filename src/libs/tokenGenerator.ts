import { TOKEN_LENGTH } from "../common/constants";

export const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < TOKEN_LENGTH; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}