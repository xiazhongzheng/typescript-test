export default {}
// 得到元组类型中的第一个元素
type FirstItem<T extends any[]> = T extends [infer L, ...infer R] ? L : never

type A = FirstItem<[string, number, boolean]> // string
type B = FirstItem<['B', 'F', 'E']> // 'B'