export default {}
import { RequiredKeys } from './3.RequiredKeys'
// 保留一个对象中的必须属性
// type PickRequired<T> = {
//   [k in RequiredKeys<T>]: k extends keyof T ? T[k] : never
//   // [k in RequiredKeys<T>]: T[k]
// }

type PickRequired<T> = Pick<T, RequiredKeys<T>>

type a1 = PickRequired<{ foo: number | undefined, bar?: string, flag: boolean }>        // {foo:number|undefined,flag:boolean}
type a2 = PickRequired<{ foo: number, bar?: string }>                                   // {foo:number}
type a3 = PickRequired<{ foo: number, flag: boolean }>                                  // {foo:number,flag:boolean}
type a4 = PickRequired<{ foo?: number, flag?: boolean }>                                // {}
type a5 = PickRequired<{}>                                                              // {}