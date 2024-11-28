import crypto from 'crypto';

// Verifica se a chave tem exatamente 32 bytes (256 bits)
const SECRET_KEY = process.env.AES_SECRET_KEY?.slice(0, 32).padEnd(32, 'x') || 'chave-padrao-com-32-caracteres'.slice(0, 32).padEnd(32, 'x');

export const encryptAES = (text: string): string => {
  try {
    const iv = crypto.randomBytes(16); // Gera um IV aleatório
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(text, 'utf8'); // Certifique-se de usar 'utf8'
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  } catch (error) {
    throw new Error(`Erro ao criptografar o texto: ${error}`);
  }
};

export const decryptAES = (encryptedText: string): string => {
  try {
    const [iv, encrypted] = encryptedText.split(':');
    if (!iv || !encrypted) {
      throw new Error('Texto criptografado inválido.');
    }
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(SECRET_KEY),
      Buffer.from(iv, 'hex')
    );
    let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error(`Erro ao descriptografar o texto: ${error}`);
  }
};