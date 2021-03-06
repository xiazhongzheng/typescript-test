export default {}
// 将联合类型转换为交叉类型

// 错误
// type UnionToIntersection<T, TT = T, R = never> = T extends any ? (

//   R extends never ? UnionToIntersection<Exclude<TT, T>, Exclude<TT, T>, T> : UnionToIntersection<Exclude<TT, T>, Exclude<TT, T>, R & T>
// ) : 'R'

// type A = UnionToIntersection<{a: string} | {b: string} | {c: string}> 
// // {a: string} & {b: string} & {c: string}

// 答案

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types

// 实现类型 UnionToIntersection，用来将联合类型转换为交叉类型

// 猜测。。的解析。。
// 参逆父，返协子 
// 协变对象，多赋少（子给父），逆变参数，少赋多（父给子）。函数参数双向的，只不过是不安全
// https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html#%E5%8D%8F%E5%8F%98%E4%B8%8E%E9%80%86%E5%8F%98
// T extends之后，分配成{a: string}、{b: string} 、{c: string}三个，根据参逆父，R是T的子类型，所以同时满足{a: string}、{b: string} 、{c: string}

type UnionToIntersection<T> = (T extends any ? ((t: T) => void) : never) extends ((r: infer R) => any) ? R : never

/*
(T extends any ? ((t: T) => void) : never) 会返回多个函数联合，组成的一个类型；
每一个函数的参数类型是联合类型T中的某一项，比如这里的结果就是：
type fun1 = ((t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void)
同一类型变量在反向变量位置的多个候选变量会导致推断交叉点类型，于是类型就变成了 {a:string}&{b:string}&{c:string}
*/
type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }> // {a: string} & {b: string} & {c: string}


// 步骤拆开来，就有问题，还是推导为联合类型
type Step1<T> = (T extends any ? ((t: T) => void) : never)

type val1 = Step1<{ a: string } | { b: string } | { c: string }>
// type val1 = ((t: {     a: string; }) => void) | ((t: {     b: string; }) => void) | ((t: {     c: string; }) => void)
// 这里 val1 实际上是 (t:{a:string}|{b:string}|{c:string})=>void

// val1 以及 (t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void) 在走Step2的时候不会分布，因为当前实际类型是 (t:{a:string}|{b:string}|{c:string})=>void
// 是确定的类型，只是参数类型是不确定的联合类型；
type Step2<T> = T extends ((r: infer R) => any) ? R : never
type val2 = Step2<val1>
type val3 = Step2<((t: { a: string }) => void) | ((t: { b: string }) => void) | ((t: { c: string }) => void)>