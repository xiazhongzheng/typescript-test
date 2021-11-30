export default {}
type LastChar<T> = T extends `${infer L}${infer R}` ? L : never
type A = LastChar<'A'> // 一个字符时可以匹配成功，L: A, R: ''
type B = LastChar<''> // 空字符时，匹配失败，L:never, R: never


type LastChar1<T> = T extends `${infer L}${infer R}` ? R : never
type A1 = LastChar1<'A'>
type B1 = LastChar1<''>