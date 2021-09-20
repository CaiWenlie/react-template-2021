import { Res, PagingRes, PagingParams } from "@src/services/request";
import { useEffect, useState, useRef, useCallback } from "react";
import { GUIItem } from "@src/models/GUI.model";
import { useLocalStore } from 'mobx-react'

// 通用paging控制器
export function usePagingHook<T, P>(config: PagingHookConfig<T, P>) {
  // 筛选条件
  type TParams = typeof config.params
  const [params, _setParams] = useState(config.params)
  const paramsRef = useRef(config.params)
  function setParams(data: Partial<P> | Partial<PagingParams>) {
    _setParams(params => {
      params = Object.assign({}, params, data)
      paramsRef.current = params
      return params
    })
  }

  // paging信息
  const [paging, setPaging] = useState<Omit<PagingRes, 'rows'>>({
    offset: params.offset,
    limit: params.limit,
    count: 0
  })

  // 数据list
  const [list, setList] = useState<T[]>([])
  const hasMore = paging.count > paging.offset + paging.limit

  // 获取/刷新列表
  const fetchList = useCallback(async function (params?: TParams) {
    params = params || paramsRef.current
    console.log('params', params)
    const res = await config.fetchList(params)
    setPaging(res)
    if (config.concat) {
      setList(list => list.concat(res.rows))
    } else {
      setList(res.rows)
    }
  }, [config.fetchList])

  // 实时引用
  const state = useLocalStore(source => {
    return source
  }, {
    params,
    paging,
    list,
    hasMore,
    fetchList
  })

  // // 上一页
  // const prevPage = useCallback(async function () {
  //   const offset = params.offset - params.limit
  //   if (offset > 0) {
  //     await fetchList({ ...params, offset })
  //     setParams({ offset })
  //   }
  // }, [params, fetchList])
  // 下一页
  const nextPage = async function () {
    const { paging, params, hasMore, fetchList } = state
    const offset = paging.offset + paging.limit
    if (hasMore) {
      await fetchList({ ...params, offset })
      setParams({ offset })
    }
  }

  // 清空列表
  const refreshList = async () => {
    setList([])
    setParams(config.params)
    console.log('reset params', config.params)
    await fetchList(config.params)
  }

  return { params, setParams, fetchList, paging, list, nextPage, hasMore, refreshList }
}

// T: Item, P: Params
interface PagingHookConfig<T, P> {
  params: P & PagingParams
  fetchList: (params: P & PagingParams) => Promise<PagingRes<T>>
  concat?: boolean
}