
// 阻止默认事件
export function prevent(func?: Function) {
  return function (e: React.MouseEvent) {
    e.preventDefault()
    func && func(e)
  }
}

// 阻止冒泡
export function stop(func?: Function) {
  return function (e: Event | React.MouseEvent) {
    e.stopPropagation()
    func && func(e)
  }
}
