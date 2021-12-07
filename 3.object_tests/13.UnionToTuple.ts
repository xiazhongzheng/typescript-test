export default {}
// UnionPop 得到联合类型中的最后一个类型
import {UnionPop} from "./12.UnionPop";

// 联合类型转换为元组类型
type UnionToTuple<T, TT = T, R extends any[] = []> = 
// T经过extends分配，T是联合类型的某一个类型，TT还是初始的联合类型
[T] extends [R[number]] ? R : // T已经在R里了
 UnionToTuple<T, Exclude<TT, UnionPop<TT>>, [UnionPop<TT>, ...R]> // T不在R里，就把T放到R里，然后继续递归。UnionPop<TT>表示递归是从后往前的

type a = UnionToTuple<1 | 2 | 3>                      // [1,2,3]
type b = UnionToTuple<1 | string | boolean>           // [1,string,boolean]
