export default {}
// 在元组类型T中添加新的类型I
type Flat<T> = T extends [...infer R] ? T : [T]
type Push<T extends any[], I> = [...T, ...Flat<I>]

type A = Push<[1,2,3], 4> // [1,2,3,4]
type B = Push<[1], 2> // [1, 2]
type C = Push<[1], [2, 3]> // [1, 2, 3]