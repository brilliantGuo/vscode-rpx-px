const multiple = 2

export interface ReplaceFuncInterface {
  (text: string): [boolean, string]
}

/**
 * 将文本含有 rpx 值得转成 px
 * @param text 传入的要做更改的文本
 * @returns Array [
 *    boolean: 是否发生更改，
 *    string: 如果有更改则返回更改后的文本，没有则返回原文本
 * ]
 */
export function toPx(text: string): [boolean, string] {
  const regex = /(\d*(\.\d+)?)rpx/g
  return regex.test(text)
    ? [true, text.replace(regex, (matchedText, num) => `${num / multiple}px`)]
    : [false, text]
}

/**
 * 将文本含有 px 值得转成 rpx
 * @param text 传入的要做更改的文本
 * @returns Array [
 *    boolean: 是否发生更改,
 *    string: 如果有更改则返回更改后的文本，没有则返回原文本
 * ]
 */
export function toRpx(text: string): [boolean, string] {
  const regex = /(\d*(\.\d+)?)px/g
  return regex.test(text)
    ? [true, text.replace(regex, (matchedText, num) => `${num * multiple}rpx`)]
    : [false, text]
}
