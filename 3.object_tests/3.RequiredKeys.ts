export default {}
// 获取对象类型中的必须属性的联合类型
// 和 1.OptionalKeys 相反
// 要返回联合类型的，就用extends。 要返回对象的，就用{}包裹，属性用[k in keyof T]的方式循环，值用extends的方式判断
export type RequiredKeys<T, K = keyof T> = K extends keyof T ? (
  Omit<T, K> extends T ? never : K
) : never

type a1 = RequiredKeys<{ foo: number | undefined, bar?: string, flag: boolean }>        // foo|flag
type a2 = RequiredKeys<{ foo: number, bar?: string }>                                   // foo
type a3 = RequiredKeys<{ foo: number, flag: boolean }>                                  // foo|flag
type a4 = RequiredKeys<{ foo?: number, flag?: boolean }>                                // never
type a5 = RequiredKeys<{}>                                                              // never