export default {} // 把文件当成局部作用域，不会和其他文件冲突
// 获取字符串字面量中的最后一个字符
// `${infer L}${infer R}`中，L可以匹配一个字符，R匹配剩余字符。所以当有一个字符时，约束可以成功。只有当空字符串时，约束才失败。所以失败时，需要取前一次成功的，引入perv这个变量
// 例子参考demo/1.infer-LastChar.ts
type LastChar<T, prev = never> = T extends `${infer L}${infer R}` ? LastChar<R, L> : prev
type A = LastChar<'BFE'> // 'E'
type B = LastChar<'dev'> // 'v'
type C = LastChar<''> // never
type D = LastChar<1> // never
// 当传空字符串或者其他类型时，默认返回never，则prev = never
// 当传空字符串或者其他类型时，默认返回原本类型，则prev = T