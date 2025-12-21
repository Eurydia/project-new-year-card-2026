import { EncryptorWeb } from '@/services/decypt'
import { parseMd } from '@/services/md-processor'

export const getCard = async (iv: string, pw: string) => {
  const url = `${import.meta.env.BASE_URL}content/${encodeURIComponent(iv)}.enc`
  const resp = await fetch(url)
  const buff = await resp.text()
  const content = await EncryptorWeb.decrypt(pw, decodeURIComponent(iv), buff)
  return parseMd(content)
}
