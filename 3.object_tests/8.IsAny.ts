export default {}
// 判断是否为any类型
// type IsAny<T> = [T] extends [Record<any, unknown>] ? ([T] extends [never] ? false : (true)) : false

// 使用 [T] 避免传入的是联合类型导致类型分布
// unknown 只能赋值给 any或者unknown
// any可以赋值给string，但是unknown不可以赋值给string
type IsAny<T> = [unknown] extends [T] ? ([T] extends [string] ? true : false) : false

type A = IsAny<string> // false
type B = IsAny<{ a: 3 }> // false
type C = IsAny<{}> // false
type C1 = IsAny<{ a: '' }> // false
type C2 = IsAny<{ a: undefined }> // false
type D = IsAny<any> // true
type E = IsAny<object> // false
type F = IsAny<Object> // false
type G = IsAny<unknown> // false
type H = IsAny<never> // false