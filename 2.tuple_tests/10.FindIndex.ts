export default {}
// 找出E类型在元组类型T中的下标

import { Equals} from '../0.demo/6.Equals'
// T是要查找的元组， I是要查找的类型，S是已经找过的类型组成的元组

// [L] extends [I] any符合所有的类型
// type FindIndex<T, I, S extends any[] = []> = T extends [infer L, ...infer R] ? (
//   [L] extends [I] ? (S['length']) : (FindIndex<R, I, [...S, null]>)
// ) : never // 如果找完了T，都没有找到，则返回S['length']

type FindIndex<T, I, S extends any[] = []> = T extends [infer L, ...infer R] ? (
  Equals<L, I> extends true ? (S['length']) : (FindIndex<R, I, [...S, null]>)
) : never // 如果找完了T，都没有找到，则返回S['length']

type A = [any, never, 1, '2', true]
type B = FindIndex<A, any> // 0
type C = FindIndex<A, never> // 1
type D = FindIndex<A, 1> // 2
type E = FindIndex<A, '2'> // 3
type F = FindIndex<A, true> // 4
type G = FindIndex<A, 343> // never



// type A4 = Equals<any, '1'> ? true : false // 报错
// type A5 = Equals<any, '1'> extends true ? true : false // false
// type A6 = Equals<any, any> // true
// type A7 = Equals<any, true> // false
// type A8 = Equals<any, {}> // false
// type A9 = Equals<any, never> // false