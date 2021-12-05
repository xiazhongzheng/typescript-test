export default {}
// 截取元组中的部分元素
// T元组，LI左下标，RI右下标，S遍历过的元组，A最后返回的元组
type Slice<T extends any[], LI extends number, RI extends number = T['length'], S extends any[] = [], A extends any[] = []> = 
  T extends [infer L, ...infer R] ? 
  (
    S['length'] extends LI ? Slice<R, LI, RI, [...S, L], [L]> : ( // 需要返回的第一个数据，只有这时，A里面才有数据，长度大于0
      A['length'] extends 0 ? Slice<R, LI, RI, [...S, L], []> : // 不是第一个数据，也可能是在LI之前的，也可能是在LI之后的，做一下判断。
        (S['length'] extends RI ? [...A, L] : Slice<R, LI, RI, [...S, L], [...A, L]>)
    )
  ) : A // T循环结束，直接返回A

type A1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>          // [any,never,1]                    从第0个位置开始，保留到第2个位置的元素类型
type A2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>          // [never,1,'2']                    从第1个位置开始，保留到第3个位置的元素类型
type A3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>          // [never,1]                        从第1个位置开始，保留到第2个位置的元素类型
type A4 = Slice<[any, never, 1, '2', true, boolean], 2>             // [1,'2',true,boolean]             从第2个位置开始，保留后面所有元素类型
type A5 = Slice<[any], 2>                                           // []                               从第2个位置开始，保留后面所有元素类型
type A6 = Slice<[], 0>                                              // []                               从第0个位置开始，保留后面所有元素类型