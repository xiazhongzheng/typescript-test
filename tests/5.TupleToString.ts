export default {}
// 将字符串类型的元素转换为字符串字面量类型
// type TupleToString<T, prev extends string = ''> = T extends [infer L, ...infer R] ? (L extends string ? TupleToString<R, `${prev}${L}`> : `${prev}${''}`) : prev
type TupleToString<T, prev extends string = ''> = T extends [infer L, ...infer R] ? (L extends string ? TupleToString<R, `${prev}${L}`> : prev) : prev
type A = TupleToString<['a', 'b', 'c']> // 'abc'
type B = TupleToString<[]>              // ''
type C = TupleToString<['a']>           // 'a'
type D = TupleToString<['1', '2', '3', '', '4']>
type E = TupleToString<['1', '2', '3', '-', '4']>