// 瀑布流

import { useState, useEffect } from "react"

export interface TImage<T> {
  data: T
  width: number
  height: number
}

// 内容线
export class Line<T> {
  maxRatio: number
  constructor(maxRatio: number = 1) {
    this.maxRatio = maxRatio
  }
  list: TImage<T>[] = []
  addItem(item: TImage<T>) {
    this.list.push(item)
  }
  // 计算高度（并不是真实高度）
  get height() {
    return this.list.map(item => {
      const ratio = item.height / item.width
      return Math.min(ratio, this.maxRatio)
    }).reduce((a, b) => a + b, 0)
  }
}

export function useWaterFallHook<T>(lineCount: number, maxRatio: number = 1) {
  const [lines, setLines] = useState<Line<T>[]>([])
  const [count, setCount] = useState(lineCount)

  useEffect(() => {
    setLines(new Array(count).fill(0).map(() => new Line()))
  }, [count])

  // 添加一条
  function addItem(lines: Line<T>[], item: TImage<T>) {
    if (lines.length) {
      // 从最短的line添加
      const minLine = lines.reduce((a, b) => a.height > b.height ? b : a)
      minLine.addItem(item)
    }
  }

  // 清空lines
  function clearLines(lines: Line<T>[]) {
    lines.forEach(line => line.list = [])
  }

  // 批量添加
  function addItems(items: TImage<T>[]) {
    setLines(lines => {
      lines = [...lines]
      // 插入数据
      items.forEach(item => addItem(lines, item))
      return lines
    })
  }

  // 重新添加
  function setItems(items: TImage<T>[]) {
    setLines(lines => {
      lines = [...lines]
      // 清空lines
      clearLines(lines)
      // 插入数据
      items.forEach(item => addItem(lines, item))
      return lines
    })
  }

  return { lines, setCount, addItems, setItems }
}