import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { globbySync } from 'globby'
import { join } from 'path'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { randomBytes, pbkdf2Sync, createCipheriv } from 'crypto'

declare module 'vfile' {
  interface DataMap {
    matter: {
      password: string
    }
  }
}
class MdProcessor {
  // private static readonly processor = unified()
  //   .use(remarkParse)
  //   .use(remarkGfm)
  //   .use(remarkFrontmatter, ['toml', 'yaml'])
  //   .use(remarkRehype)
  //   .use(rehypeSanitize)
  //   .use(rehypeStringify)
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
    // decryptFromBase64(password: string, blobB64: string): string {
    //   const blob = Buffer.from(blobB64, 'base64')
    //   if (blob.length <= IV_LEN) throw new Error('Invalid blob')

    //   const iv = blob.subarray(0, IV_LEN)
    //   const ciphertext = blob.subarray(IV_LEN)

    //   const key = deriveKeyFromPasswordAndIV(password, iv)

    //   const decipher = createDecipheriv(ALG, key, iv)
    //   // If password is wrong or data is corrupted, this may throw (bad padding) or output garbage.
    //   const plaintext = Buffer.concat([
    //     decipher.update(ciphertext),
    //     decipher.final(),
    //   ])

    //   return plaintext.toString('utf8')
    // }
  }
}
const ROOT_DIR = process.cwd()
const CONTENT_SRC_DIR = join(ROOT_DIR, 'content')
const PUB_DIR = join(ROOT_DIR, 'public')
const CONTENT_DEST_DIR = join(PUB_DIR, 'content')

function main() {
  if (existsSync(CONTENT_DEST_DIR)) {
    rmSync(CONTENT_DEST_DIR, { recursive: true, force: true })
  }

  if (!existsSync(CONTENT_DEST_DIR)) {
    mkdirSync(CONTENT_DEST_DIR, { recursive: true })
  }

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
    const pw = matter?.password as string
    const { ctB64, ivB64 } = Encryptor.encrypt(pw, content)
    data[entry.path] = {
      iv: ivB64,
      pw,
    }
    writeFileSync(
      join(CONTENT_DEST_DIR, `${encodeURIComponent(ivB64)}.enc`),
      ctB64,
      {
        flush: true,
        flag: 'w+',
      },
    )
  }

  writeFileSync(
    join(CONTENT_DEST_DIR, 'content.json'),
    JSON.stringify(data, undefined, 4),
  )
}

main()
