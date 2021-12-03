export default {}
// 反转元组
type ReverseTuple<T> = T extends [infer L, infer R] ? [R, L] : (T extends [infer L, ...infer R] ? [...ReverseTuple<R>, L] : [])

type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
type B = ReverseTuple<[1, 2, 3]> // [3,2,1]
type C = ReverseTuple<[]> // []
type D = ReverseTuple<[1, 2]> // [2, 1]