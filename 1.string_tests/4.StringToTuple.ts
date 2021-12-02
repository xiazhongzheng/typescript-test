export default {}
// 字符串转换为元组类型
type StringToTuple<T, prev extends Array<any> = []> = T extends `${infer L}${infer R}` ? StringToTuple<R, [...prev, L]> : prev
type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
type B = StringToTuple<'1234'> // []
type C = StringToTuple<''> // []