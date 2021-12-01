export default {}
// 驼峰命名转横杠命名
// T驼峰字符串，S横杠字符串
type KebabCase<T, S extends string = ''> = T extends `${infer L}${infer R}` ? 
  ( // T还有字符，循环中
    L extends Uppercase<L> ? 
    ( // L是大写
      S extends '' ? 
      KebabCase<R, `${Lowercase<L>}`> : // 第一个大写，不需要加横杠
      KebabCase<R, `${S}-${Lowercase<L>}`>
    ) : KebabCase<R, `${S}${L}`> // L是小写，T减一，S加一，继续循环
  ) : S // T循环结束后，返回S

type a1 = KebabCase<'HandleOpenFlag'>           // handle-open-flag
type a2 = KebabCase<'OpenFlag'>                 // open-flag