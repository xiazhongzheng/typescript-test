export default {}
// any 是 string | number | symbol
type P1<T> = T extends 'x' ? string : number
type A1 = P1<any> // string | number



type P2<T> = [T] extends ['x'] ? string : number
type A2 = P2<any> // string

type A3 = keyof any // string | number | symbol
type A4 = any extends 'x' ? 'x': never
type A5 = any extends 'y' ? 'y': never
type A6 = any extends 12 ? 12: never
type A7 = any extends symbol ? symbol: never

type A8 = any extends never ? '1' : '2'