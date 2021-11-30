export default {}
// 将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量
// T是原字符串，C是分隔符，S是临时拼接的字符串，A是分割后的元组
type SplitString<T extends string, C extends string, S extends string = '', A extends any[] = []> = 
  T extends `${infer L}${infer R}` ? 
  (L extends C ? SplitString<R, C, '', [...A, S]> // 如果当前字符可以分解成左右，并且第一个字符是分割符。A元组中加上S字符串，并且S置空
  : SplitString<R, C, `${S}${L}`, A>)  // 如果当前字符可以分解成左右，但是第一个字符不是分割符。A元组不变，S字符串加上当前第一个字符
  : [...A, S] // 如果结束了，把S加到A中，返回

type A1 = SplitString<'handle-open-flag', '-'>        // ["handle", "open", "flag"]
type B1 = SplitString<'handle-open-flag-', '-'>        // ["handle", "open", "flag", ""]
type A2 = SplitString<'open-flag', '-'>               // ["open", "flag"]
type A3 = SplitString<'handle.open.flag', '.'>        // ["handle", "open", "flag"]
type A4 = SplitString<'open.flag', '.'>               // ["open", "flag"]
type A5 = SplitString<'open.flag', '-'>               // ["open.flag"]