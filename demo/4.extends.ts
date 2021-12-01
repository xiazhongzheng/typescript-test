export default {}
// https://blog.csdn.net/qq_34998786/article/details/120300361
// extends 的几种含义
/**
 * 表示继承/拓展的含义
   表示约束的含义
   表示分配的含义
 */
// 1、表示继承/拓展的含义
interface Animal {
  eat: string
}

interface Human extends Animal {
  say: string
}

var ami:Animal = {
  eat: '',
  // say: '' // 报错
}

var man:Human = {
  eat: '',
  say: '',
  // other: '' // 报错
}

// 2、表示约束的含义
// A extends B，是指类型A可以分配给类型B，而不是说类型A是类型B的子集
// case 1
type HumanKey<T extends Human, K extends keyof T> = T[K]
// Animal 的属性少于 Human，不可以分配给Human，所以约束失败
// type aa = HumanKey<Animal, 'say'> // 报错
type aaa = HumanKey<Human, 'say'>
type aaaa = HumanKey<Human, 'eat'>

// case 2
// 'x' | 'y' 不可以分配给 'x'，所以约束失败
type P = 'x' | 'y' extends 'x' ? string : number

// 3、表示分配的含义
/**
 * 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。
 * 分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。
 */
// case 1
type P1<T> = T extends 'x' ? string : number
type A = P1<'x' | 'y'> // string | number

// case 2 特例 never
type A1  = never extends  'x' ? string : number // string 因为never是所有类型的子类型
// 但是never当成联合类型传进去，却不是string
// never被认为是空的联合类型，也就是说，没有联合项的联合类型，所以还是满足上面的分配律，
// 然而因为没有联合项可以分配，所以P<T>的表达式其实根本就没有执行，所以A2的定义也就类似于永远没有返回的函数一样，是never类型的。
type A2 = P1<never> // never

// case 3 防止条件判断中的分配
// 条件判断类型的定义中，将泛型参数使用[]括起来，即可阻断条件判断类型的分配，此时，传入参数T的类型将被当做一个整体，不再分配。
type P2<T> = [T] extends ['x'] ? string : number
type A3 = P2<'x' | 'y'> // number