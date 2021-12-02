export default {}
// 首字母大写
// ts类型推导中也可以使用模板字符串，每一个{infer X}占位一个字符，最后一个占位剩余的所有字符
type CapitalizeString<T> = T extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : T
type a1 = CapitalizeString<'handler'>       // Handler
type a2 = CapitalizeString<'parent'>        // Parent
type a3 = CapitalizeString<233>             // 233