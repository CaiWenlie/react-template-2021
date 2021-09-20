import { observable } from 'mobx'

// 通用cache store
export function createCacheStore<T>(config: CreateCacheStoreParams<T>) {
  const timeout = config.timeout || 1
  let timestamp = 0
  const store = observable({
    _value: config.initialValue,
    get value(): T {
      if (Date.now() - timestamp > timeout * 1000) {
        store.fetchValue()
      }
      return store._value
    },
    async fetchValue(data?: any) {
      const now = Date.now()
      const value = await config.fetchValue(data)
      timestamp = now
      store._value = value
    }
  })
  return store
}
export interface CreateCacheStoreParams<T> {
  initialValue: T
  fetchValue: (data?: any) => Promise<T>
  timeout?: number // 单位s
}

// 状态开关
export function createModalStore<T>() {
  const store = observable({
    visible: false,
    data: null as T | null,
    callback: null as ((data?: T) => void) | null,
    open(data?: T, callback?: (data?: T) => void) {
      store.data = data || null
      store.callback = callback || null
      store.visible = true
    },
    close() {
      store.visible = false
      store.callback = null
    }
  })
  return store
}