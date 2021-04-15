import { FeedbackExtended, StoragePhone } from 'types'

class PhoneStorage {
  private phonesStorageKey: string

  constructor(isTest: boolean) {
    this.phonesStorageKey = 'phones' + (isTest ? '_test' : '')
  }

  public getAll(): StoragePhone[] {
    const phones = localStorage.getItem(this.phonesStorageKey)
    return phones ? JSON.parse(phones) : []
  }

  public add(phone: StoragePhone): StoragePhone | null {
    const phones = this.getAll()
    if (phones.find((p) => p.id === phone.id)) return null

    // TODO: maybe max number should come from backend
    if (phones.length >= 6) {
      const popped = phones.shift()
      phones.push(phone)
      localStorage.setItem(this.phonesStorageKey, JSON.stringify(phones))
      return popped ?? null
    } else {
      phones.push(phone)
      localStorage.setItem(this.phonesStorageKey, JSON.stringify(phones))
      return null
    }
  }

  public update(id: number, newStatus: FeedbackExtended) {
    const phones = this.getAll()
    const toUpdate = phones.find((p) => p.id === id)
    if (!toUpdate) return
    toUpdate.status = newStatus
    toUpdate.restore.lastStatus = newStatus
    localStorage.setItem(this.phonesStorageKey, JSON.stringify(phones))
  }
}

export { PhoneStorage }
