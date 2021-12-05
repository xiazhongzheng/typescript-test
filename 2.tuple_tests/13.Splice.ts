export default {}
// 删除并且替换部分元素
// T原数组，S开始替换的位置，K需要删除的长度，A需要插入的数组
// U返回的数组，V遍历过的数组（包括插入的），D删除的长度的数组，F是否正在删除
type Splice<T, S, K, A extends any[] = [], U extends any[] = [], V extends any[] = [],  D extends any[] = [], F = false> = 
T extends [infer L, ...infer R]
? V['length'] extends S
  ? Splice<R, S, K, A, [...U, ...A], [...V, L], [L], true> // 第一个开始删除的，把F置为true，D（删除的数组）开始写入。把需要插入的数组，一次添加进去
  : D['length'] extends K
    ? Splice<R, S, K, A, [...U, L], [...V, L], [...D, L], false> // 删除结束，F置为false
    : F extends true
      ? Splice<R, S, K, A, U, [...V, L], [...D, L], F> // 正在删除，D删除的数组，长度加上
      : Splice<R, S, K, A, [...U, L], [...V, L], D, F> // 不是删除，D的长度不变
: U // 遍历结束，返回U
type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>                   // [boolean,null,undefined,never]               从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>                   // [string,undefined,never]                     从第1开始删除，删除3个元素
type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>        // [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3