export default {}
// 复制字符T为字符串类型，长度为C
// T 是复制的字符， N是复制的次数， A是每次循环添加的元组，通过判断N和A的长度是否相等得到循环的次数。S是拼接的字符串
type RepeatString<T extends string, N, A extends any[] = [], S extends string = ''> = N extends A["length"] ? S : RepeatString<T, N, [...A, null], `${S}${T}`>

type A = RepeatString<'a', 3> // 'aaa'
type B = RepeatString<'a', 0> // ''
type C = RepeatString<'b', 2> // 'bb'