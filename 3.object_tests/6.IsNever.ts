export default {}
// 判断是否为never类型
// []可以让extends避免分配
// 错误
// type IsNever<T> = T extends never ? true : false
// 答案
type IsNever<T> = [T] extends [never] ? true : false
// 任何类型都不可以赋值给never类型

type A = IsNever<never> // true
type B = IsNever<string> // false
type C = IsNever<undefined> // false
type D = IsNever<any> // false