import { useMemo } from "react"

// GUI缩略图（宽度600min, 高度不限）
export function makeGuiThumb(cover: string = '') {
  return cover.replace(/\?.*/, '') + '?imageView2/3/w/600/h/0'
}

// App缩略图（限定长宽300）
export function makeAppThumb(cover: string = '') {
  return cover.replace(/\?.*/, '') + '?imageView2/1/w/300'
}

// memo
export function useGuiThumbHook(cover: string = '') {
  return useMemo(() => makeGuiThumb(cover), [cover])
}

// memo
export function useAppThumbHook(cover: string = '') {
  return useMemo(() => makeAppThumb(cover), [cover])
}
