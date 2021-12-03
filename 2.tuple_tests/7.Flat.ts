export default {}
// 拍平元组
// T是元组，A是结果
type Flat<T, A extends any[] = []> = T extends [infer L, ...infer R] ?
  (
    L extends any[] ?
    Flat<[...L, ...R], A> // 当前还是元组，把当前的元组和剩余的部分形成新的元组再拍平
    : Flat<R, [...A, L]> // 当前不是元组，当前的值加入结果中，继续剩余的部分拍平
  ) : A
type A = Flat<[1, 2, 3]> // [1,2,3]
type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
type C = Flat<[]> // []
type D = Flat<[1]> // [1]