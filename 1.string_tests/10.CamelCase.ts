export default {}
// 横杠命名转化为驼峰命名
// T横杠字符串，S驼峰字符串，C是临时驼峰字符串
type CamelCase<T, S extends string = '', C extends string = ''> = T extends `${infer L}${infer R}` ? (
  C extends '' ? CamelCase<R, `${S}${Uppercase<L>}`, `${Uppercase<L>}`> // C是空的，说明是每个单词的首字母，首字母大写，并拼接
  : (
    L extends '-' ? CamelCase<R, S, ''> : // 当前是横杠，不处理，继续循环，并且下一个重置为首字母
    CamelCase<R, `${S}${L}`, `${C}${L}`> // 不是首字母，拼接上即可
  )
) : S // 循环结束，返回S

type a1 = CamelCase<'handle-open-flag'>         // HandleOpenFlag
type a2 = CamelCase<'open-flag'>                // OpenFlag

type GetListenName<T, S extends string = 'on'> = CamelCase<T, S>

type a3 = GetListenName<'handle-open-flag'>         // onHandleOpenFlag
type a4 = GetListenName<'open-flag'>                // onOpenFlag

export {
  GetListenName
}