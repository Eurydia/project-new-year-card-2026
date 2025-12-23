import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto'
import { readFileSync, writeFileSync } from 'fs'
import { globbySync } from 'globby'
import { join } from 'path'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

class MdProcessor {
  static mdToHtmlFragment(path: string) {
    const file = new VFile(readFileSync(path))
    matter(file)
    return {
      matter: file.data.matter,
      content: file.value.toString(),
    }
  }
}

class Encryptor {
  private static readonly ALG = 'aes-256-cbc'
  private static readonly IV_LEN = 16
  private static readonly KEY_LEN = 32
  private static readonly ITERATIONS = 600_000
  private static readonly DIGEST = 'sha256'

  private static deriveKey(password: string, iv: Buffer) {
    return pbkdf2Sync(
      password,
      iv,
      Encryptor.ITERATIONS,
      Encryptor.KEY_LEN,
      Encryptor.DIGEST,
    )
  }

  static decrypt(password: string, ivB64: string, ctB64: string): string {
    const iv = Buffer.from(ivB64, 'base64')
    const ct = Buffer.from(ctB64, 'base64')

    const key = Encryptor.deriveKey(password, iv)

    const decipher = createDecipheriv(Encryptor.ALG, key, iv)
    const pt = Buffer.concat([decipher.update(ct), decipher.final()])
    return pt.toString('utf8')
  }
  static encrypt(password: string, plaintextUtf8: string) {
    const iv = randomBytes(Encryptor.IV_LEN)
    const key = Encryptor.deriveKey(password, iv)

    const cipher = createCipheriv(Encryptor.ALG, key, iv)
    const ct = Buffer.concat([
      cipher.update(plaintextUtf8, 'utf8'),
      cipher.final(),
    ])

    return {
      ivB64: iv.toString('base64'),
      ctB64: ct.toString('base64'),
    }
  }
}
const ROOT_DIR = process.cwd()
const CONTENT_SRC_DIR = join(ROOT_DIR, 'content')
const PUB_DIR = join(ROOT_DIR, 'scripts', 'content-out')

function main() {
  const data: Record<string, { iv: string; pw: string }> = {}

  for (const entry of globbySync(`./**/*.md`, {
    ignore: ['**/__*', '**/__*/**'],
    cwd: CONTENT_SRC_DIR,
    onlyFiles: true,
    stats: true,
  })) {
    const { content, matter } = MdProcessor.mdToHtmlFragment(
      join(CONTENT_SRC_DIR, entry.path),
    )
    const pw = (matter as { password: string }).password
    let ct: string | undefined
    let iv: string | undefined
    do {
      const { ctB64, ivB64 } = Encryptor.encrypt(pw, content)
      data[entry.path] = {
        iv: ivB64,
        pw,
      }
      if (!ivB64.includes('/')) {
        ct = ctB64
        iv = ivB64
      }
    } while (iv === undefined || ct === undefined)

    writeFileSync(join(PUB_DIR, `${encodeURIComponent(iv)}.enc`), ct, {
      flush: true,
      flag: 'w+',
    })
  }

  writeFileSync(
    join(CONTENT_SRC_DIR, 'content.json'),
    JSON.stringify(data, undefined, 4),
  )
}

main()
