export default {}
// 比较两个类型是否相等

// any 等于 任意类型，除了never
// type Equals<T, S> = [T] extends [S] ? 
//   (
//     [S] extends [T] ? true : false
//   ) : false;
// type A1 = Equals<1, 1> // true
// type A2 = Equals<true, 1> // false
// type A3 = Equals<'1', 1> // false
// type A4 = Equals<any, 1> // true
// type A5 = Equals<any, '1'> // true
// type A6 = Equals<any, any> // true
// type A7 = Equals<any, true> // true
// type A8 = Equals<any, {}> // true
// type A9 = Equals<any, never> // false


export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

type A1 = Equals<1, 1> // true
type A2 = Equals<true, 1> // false
type A3 = Equals<'1', 1> // false
type A4 = Equals<any, 1> // false
type A5 = Equals<any, '1'> // false
type A6 = Equals<any, any> // true
type A7 = Equals<any, true> // false
type A8 = Equals<any, {}> // false
type A9 = Equals<any, never> // false



