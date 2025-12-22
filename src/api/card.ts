import { EncryptorWeb } from '@/services/decypt'

export const fetchAndDecryptCard = async (iv: string, pw: string) => {
  const url = `${import.meta.env.BASE_URL}content/${encodeURIComponent(iv)}.enc`
  const resp = await fetch(url)
  const buff = await resp.text()
  return await EncryptorWeb.decrypt(pw, decodeURIComponent(iv), buff)
}
