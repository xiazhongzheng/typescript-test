export default {}
// type TupleToString<T> = T extends [infer L, infer R] ? L : never
// type TupleToString1<T> = T extends [infer L, infer R] ? R : never
type TupleToString<T> = T extends [infer L, ...infer R] ? L : never
type TupleToString1<T> = T extends [infer L, ...infer R] ? R : never

type A = TupleToString<['a', 'b', 'c']>
type A1 = TupleToString1<['a', 'b', 'c']>