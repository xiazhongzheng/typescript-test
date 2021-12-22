export default {}
// 判断是否为没有属性的对象类型{}
// []避免never不进入extends
// 暂时测试没问题
// type IsEmptyType<T> = [T] extends [Record<any, undefined>] ? (keyof T extends never ? true : false) : false

// 答案1
// 原始数据类型不可以赋值给另一个原始数据类型 number不可以赋值给object
// 包装数据类型可以赋值给原始数据类型，比如 Number可以赋值给object
// type IsEmptyType<T> =
//   number extends T ?
//     keyof T extends never ? 
//       T extends {} ? true : false
//       : false
//     : false

// 答案2
type IsEmptyType<T> = [keyof T] extends [never] ? (
  [unknown] extends [T] ? false : (number extends T ? true : false)
) : false

type A = IsEmptyType<string> // false
type B = IsEmptyType<{ a: 3 }> // false
type C = IsEmptyType<{}> // true
type C1 = IsEmptyType<{ a: '' }> // false
type C2 = IsEmptyType<{ a: undefined }> // false
type D = IsEmptyType<any> // false
type E = IsEmptyType<object> // false
type F = IsEmptyType<Object> // false
type G = IsEmptyType<unknown> // false
type H = IsEmptyType<never> // false

type I = number extends never ? true : false // false
type J = never extends never ? true : false // true
type L<T> = T extends never ? true : false
type M = L<never> // never 是泛型传入extends时，不会触发判断
type O<T> = [T] extends [never] ? true : false
type P = O<never> // true []避免never不进入extends