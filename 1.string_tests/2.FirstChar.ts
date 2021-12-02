export default {}
// 获取字符串字面量中的第一个字符
type FirstChar<T> = T extends `${infer L}${infer R}` ? L : never
type A = FirstChar<'BFE'> // 'B'
type B = FirstChar<'dev'> // 'd'
type C = FirstChar<''> // never