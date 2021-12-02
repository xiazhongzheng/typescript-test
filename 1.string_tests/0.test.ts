export default {} // 把文件当成局部作用域，不会和其他文件冲突
// ts启用严格模式，null和undefined不能赋值给其他类型
let a:string | number = ''
a = 111
a = true
a = null
a = undefined