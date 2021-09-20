// 从url下载
export function downloadFromUrl(url: string, filename?: string) {
  const element = document.createElement('a')
  element.setAttribute('download', filename || '')
  element.setAttribute('target', '_blank')
  element.setAttribute('href', url)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}