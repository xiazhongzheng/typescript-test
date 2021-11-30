export default {}
// 计算字符串字面量类型的长度
// T是字符串，A是计算长度的元组
type LengthOfString<T, A extends any[] = []> = T extends `${infer L}${infer R}` ? LengthOfString<R, [...A, L]> : A['length']

type A = LengthOfString<'BFE.dev'> // 7
type B = LengthOfString<''> // 0