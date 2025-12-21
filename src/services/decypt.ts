export class EncryptorWeb {
  private static readonly ALG = 'AES-CBC' as const
  private static readonly KEY_BITS = 256
  private static readonly ITERATIONS = 600_000
  private static readonly HASH = 'SHA-256' as const

  private static enc = new TextEncoder()
  private static dec = new TextDecoder()

  private static b64ToBytes(b64: string) {
    const bin = atob(b64)
    const out = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) {
      out[i] = bin.charCodeAt(i)
    }
    return out
  }

  private static async deriveKey(
    password: string,
    salt: Uint8Array,
  ): Promise<CryptoKey> {
    const pwKey = await crypto.subtle.importKey(
      'raw',
      EncryptorWeb.enc.encode(password),
      'PBKDF2',
      false,
      ['deriveKey'],
    )

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: Buffer.from(salt),
        iterations: EncryptorWeb.ITERATIONS,
        hash: EncryptorWeb.HASH,
      },
      pwKey,
      { name: EncryptorWeb.ALG, length: EncryptorWeb.KEY_BITS },
      false,
      ['encrypt', 'decrypt'],
    )
  }

  static async decrypt(password: string, ivB64: string, ctB64: string) {
    const iv = EncryptorWeb.b64ToBytes(ivB64)
    const ct = EncryptorWeb.b64ToBytes(ctB64)

    const key = await EncryptorWeb.deriveKey(password, iv)

    const ptBuf = await crypto.subtle.decrypt(
      { name: EncryptorWeb.ALG, iv: Buffer.from(iv) },
      key,
      Buffer.from(ct),
    )
    return EncryptorWeb.dec.decode(ptBuf)
  }
}
