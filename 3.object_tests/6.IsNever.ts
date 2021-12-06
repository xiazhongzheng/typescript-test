export default {}
// 判断是否为never类型
// []可以让extends避免分配
// type IsNever<T> = T extends never ? true : false
type IsNever<T> = [T] extends [never] ? true : false

type A = IsNever<never> // true
type B = IsNever<string> // false
type C = IsNever<undefined> // false
type D = IsNever<any> // false