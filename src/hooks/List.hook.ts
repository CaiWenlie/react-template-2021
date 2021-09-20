import { Res } from "@src/services/request";
import { useEffect, useState, useRef } from "react";

// 通用list增删改查控制器
export function useListHook<T, P>(config: ListHookConfig<T, P>) {
  const [list, setList] = useState<T[]>([])
  const [current, setCurrent] = useState<T>()

  // 筛选条件
  const [params, _setParams] = useState<P>(config.params)
  const paramsRef = useRef(config.params)
  function setParams(data: Partial<P>) {
    _setParams(params => {
      params = Object.assign({}, params, data)
      paramsRef.current = params
      return params
    })
  }

  // 获取列表
  async function fetchList(params?: P) {
    params = params || paramsRef.current
    console.log('params', params)
    const data = await config.fetchList(params)
    setList(data)
  }

  // 增删改查
  async function create(item: Omit<T, 'id'>) {
    if (config.create) {
      await config.create(item)
      fetchList()
    }
  }
  async function remove(id: number) {
    if (config.remove) {
      await config.remove({ id })
      fetchList()
    }
  }
  async function update(item: T) {
    if (config.update) {
      await config.update(item)
      fetchList()
    }
  }
  const detail = config.detail

  return { list, current, setCurrent, fetchList, create, remove, update, detail, params, setParams }
}

// T: Item, P: Params
interface ListHookConfig<T, P> {
  params: P
  fetchList: (params: P) => Promise<T[]>
  create?: (item: Omit<T, 'id'>) => Promise<Res>
  remove?: (data: { id: number }) => Promise<Res>
  update?: (item: T) => Promise<Res>
  detail?: (data: { id: number }) => Promise<T>
}