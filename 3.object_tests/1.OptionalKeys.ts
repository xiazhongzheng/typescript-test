export default {}
// 获取对象类型中的可选属性的联合类型
// Omit<T, K> 从T里面排除K
// 当去掉K之后，任然可以分配给T，说明K是可选的
type OptionalKeys<T, K = keyof T> = K extends keyof T ? (
  Omit<T, K> extends T ? K : never
) : never

type a1 = OptionalKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // bar
type a2 = OptionalKeys<{ foo: number, bar?: string }>                                   // bar
type a3 = OptionalKeys<{ foo: number, flag: boolean }>                                  // never
type a4 = OptionalKeys<{ foo?: number, flag?: boolean }>                                // foo|flag
type a5 = OptionalKeys<{}>                                                              // never




// 写法一：undefined判断，当值是undefined，或者带有undefined的联合类型时，也会选上。所以不可靠
// type OptionalKeys<T, K = keyof T> = K extends keyof T ? (
//   undefined extends T[K] ? K : never
// ) : never

// 疑问一：undefined extends T[K] 和 T[K] extends undefined不一样？
// type OptionalKeys<T, K = keyof T> = K extends keyof T ? (
//   T[K] extends undefined ? K : never
// ) : never
// 解答：extends 表示约束，A extends B，是指类型A可以分配给类型B，而不是说类型A是类型B的子集
// undefined extends T[K]表示 undefined可以分配给T[K]，T[K]可以是undefined，或者带有undefined的联合类型。而可选的值，就是该值和undefined的联合类型
// T[K] extends undefined 表示T[K]可以分配给undefined，T[K]只能是undefined

// 疑问二：K extends keyof T = keyof T 放在上面不行（放在类型的参数中）？
// type OptionalKeys1<T, K extends keyof T = keyof T> = undefined extends T[K] ? K : never
// type aaa = keyof { foo: number, bar?: string } // "foo" | "bar"  keyof 是获取key的联合类型
// 解答：extends有分配的作用， K extends keyof T放在等于号后面，可以把K分配成每一个单个的K，用单个的K获取单个的值，和undefined对比。
// 如果放在参数中，只是起到类型约束的作用，undefined extends T[K] 的 K是key的联合类型，T[K]是值的联合类型，undefined始终可以分配给值的联合类型，所以都会生效

// // 所有的都生效了
// type a0 = OptionalKeys1<{ foo: number | undefined, bar?: string, flag: boolean }>        // "foo" | "bar" | "flag"
// type a01 = OptionalKeys1<{ foo: number, bar?: string }>        // "foo" | "bar"
